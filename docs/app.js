// Appropriations Bill Version Tracker - Application Logic

(function() {
  'use strict';

  let currentFY = 2026;
  let currentTab = 'matrix';
  let precomputedDiffs = null;
  let diffsLoading = false;

  // === Initialization ===
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    mergeSenateData();
    mergeEnactedData();
    setupTabs();
    setupFYSelector();
    setupPopup();
    setupExport();
    renderAll();
  }

  // Merge Senate data into FY2025 bills
  function mergeSenateData() {
    if (typeof SENATE_FY2025_DATA === 'undefined') return;
    const fy2025 = APPROPRIATIONS_DATA.fiscalYears[2025];
    if (!fy2025) return;

    fy2025.bills.forEach(bill => {
      const senateInfo = SENATE_FY2025_DATA[bill.id];
      if (senateInfo) {
        bill.senateBillNumber = senateInfo.senateBillNumber;
        bill.senateUrl = senateInfo.senateUrl;
        // Update senate_passed stage with real data
        bill.stages.senate_passed = {
          available: true,
          date: senateInfo.senateReportedDate,
          note: 'Reported to Senate (' + senateInfo.senateBillNumber + '), placed on calendar, no floor vote',
          documents: senateInfo.documents
        };
      }
    });

    // Update status text
    fy2025.status = 'House bills reported; 5 passed House; Senate reported 11 of 12 bills; none enacted as standalone';
  }

  // Merge FY2026 enacted legislation data
  function mergeEnactedData() {
    if (typeof FY2026_ENACTED_DATA === 'undefined') return;
    const fy2026 = APPROPRIATIONS_DATA.fiscalYears[2026];
    if (!fy2026) return;

    // Map bill IDs to their enacted package
    const billToPackage = {};
    FY2026_ENACTED_DATA.packages.forEach(pkg => {
      pkg.bills.forEach(billId => {
        billToPackage[billId] = pkg;
      });
    });

    fy2026.bills.forEach(bill => {
      const pkg = billToPackage[bill.id];
      if (pkg) {
        // Mark as enacted
        const docs = [
          { type: "bill_text", label: "Enrolled Bill (PDF)", url: pkg.enrolledPdf, format: "pdf" }
        ];
        if (pkg.publicLawPdf) {
          docs.push({ type: "bill_text", label: pkg.publicLaw + " (PDF)", url: pkg.publicLawPdf, format: "pdf" });
        }
        docs.push({ type: "bill_text", label: pkg.billNumber + " on Congress.gov", url: pkg.url, format: "link" });

        bill.stages.enacted = {
          available: true,
          date: pkg.signedDate,
          vote: pkg.houseVote ? 'H: ' + pkg.houseVote + (pkg.senateVote ? ' / S: ' + pkg.senateVote : '') : '',
          documents: docs,
          note: pkg.note + ' (' + pkg.billNumber + ', ' + pkg.publicLaw + ')'
        };

        // Also mark house_passed and senate_passed based on package passage
        if (!bill.stages.house_passed || !bill.stages.house_passed.available) {
          bill.stages.house_passed = {
            available: true,
            date: pkg.signedDate,
            vote: pkg.houseVote || '',
            documents: [{ type: "bill_text", label: pkg.billNumber + " (package bill)", url: pkg.url, format: "link" }],
            note: "Passed as part of " + pkg.billNumber
          };
        }
        if (!bill.stages.senate_passed || !bill.stages.senate_passed.available) {
          bill.stages.senate_passed = {
            available: true,
            date: pkg.signedDate,
            vote: pkg.senateVote || '',
            documents: [{ type: "bill_text", label: pkg.billNumber + " (package bill)", url: pkg.url, format: "link" }],
            note: "Passed as part of " + pkg.billNumber
          };
        }
      }
    });

    // Update status
    const enacted = FY2026_ENACTED_DATA.packages.reduce((sum, p) => sum + p.bills.length, 0);
    const unfunded = FY2026_ENACTED_DATA.unfunded.length;
    fy2026.status = enacted + ' of 12 bills enacted through 3 package bills; ' + unfunded + ' (DHS) remains on continuing resolution';
  }

  // === Tab Navigation ===
  function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.getElementById('tab-' + tab).classList.add('active');
        currentTab = tab;
        if (tab === 'timeline') renderTimeline();
        if (tab === 'compare') renderCompare();
      });
    });
  }

  // === FY Selector ===
  function setupFYSelector() {
    const select = document.getElementById('fy-select');
    select.addEventListener('change', () => {
      currentFY = parseInt(select.value);
      renderAll();
    });
  }

  // === CSV Export ===
  function setupExport() {
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
  }

  function exportCSV() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;

    const stages = APPROPRIATIONS_DATA.stageDefinitions;
    const rows = [];

    // Header
    const header = ['Bill', 'Bill Number', 'Full Name'];
    stages.forEach(s => {
      header.push(s.label + ' (Status)');
      header.push(s.label + ' (Date)');
      header.push(s.label + ' (Vote)');
      header.push(s.label + ' (URL)');
    });
    rows.push(header);

    // Data rows
    fyData.bills.forEach(bill => {
      const row = [
        bill.shortName,
        bill.congressGovBillNumber || '',
        bill.fullName
      ];

      stages.forEach(stageDef => {
        const stage = bill.stages[stageDef.id];
        if (!stage) {
          row.push('Not Available', '', '', '');
          return;
        }

        if (stage.available && stage.documents && stage.documents.length) {
          row.push('Available');
          row.push(stage.date || '');
          row.push(stage.vote || '');
          // First document URL
          row.push(stage.documents[0].url || '');
        } else if (stage.vote && stage.vote.includes('failed')) {
          row.push('Failed');
          row.push(stage.date || '');
          row.push(stage.vote || '');
          row.push('');
        } else if (stage.note) {
          row.push(stage.note);
          row.push(stage.date || '');
          row.push(stage.vote || '');
          row.push('');
        } else {
          row.push('Not Available');
          row.push('');
          row.push('');
          row.push('');
        }
      });

      rows.push(row);
    });

    // Generate CSV
    const csv = rows.map(row =>
      row.map(cell => {
        const val = String(cell).replace(/"/g, '""');
        return val.includes(',') || val.includes('"') || val.includes('\n')
          ? '"' + val + '"'
          : val;
      }).join(',')
    ).join('\n');

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appropriations_fy' + currentFY + '_tracker.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // === Popup ===
  function setupPopup() {
    document.getElementById('popup-close').addEventListener('click', hidePopup);
    document.getElementById('popup-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) hidePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePopup();
    });
  }

  function showPopup(billId, stageId) {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const bill = fyData.bills.find(b => b.id === billId);
    if (!bill) return;
    const stage = bill.stages[stageId];
    if (!stage || !stage.available) return;
    const stageDef = APPROPRIATIONS_DATA.stageDefinitions.find(s => s.id === stageId);

    const titleEl = document.getElementById('popup-title');
    const bodyEl = document.getElementById('popup-body');

    titleEl.textContent = bill.shortName + ' - ' + (bill.fullName || '');

    let html = '';
    html += '<div class="popup-stage-label">' + esc(stageDef.label) + '</div>';
    if (stage.date) {
      html += '<div class="popup-date">' + formatDate(stage.date) + '</div>';
    }
    if (stage.vote) {
      html += '<div style="margin-bottom:0.75rem;font-weight:600;color:' +
        (stage.vote.includes('failed') ? 'var(--red)' : 'var(--green)') + '">Vote: ' + esc(stage.vote) + '</div>';
    }

    if (stage.documents && stage.documents.length) {
      stage.documents.forEach(doc => {
        const icon = getDocIcon(doc.format);
        html += '<a class="popup-doc-link" href="' + esc(doc.url) + '" target="_blank" rel="noopener">';
        html += '<span class="popup-doc-icon">' + icon + '</span>';
        html += '<span class="popup-doc-info">';
        html += '<span class="popup-doc-label">' + esc(doc.label) + '</span>';
        html += '<span class="popup-doc-format">' + esc(doc.format) + '</span>';
        html += '</span>';
        html += '</a>';
      });
    }

    if (stage.summary) {
      html += '<div class="popup-summary">' + esc(stage.summary) + '</div>';
    }

    if (stage.note) {
      html += '<div class="popup-note">' + esc(stage.note) + '</div>';
    }

    if (bill.congressGovUrl) {
      html += '<div style="margin-top:1rem;padding-top:0.75rem;border-top:1px solid var(--border)">';
      html += '<a href="' + esc(bill.congressGovUrl) + '" target="_blank" rel="noopener" style="font-size:0.8rem">View on Congress.gov &rarr;</a>';
      html += '</div>';
    }

    bodyEl.innerHTML = html;
    document.getElementById('popup-overlay').classList.add('visible');
  }

  function hidePopup() {
    document.getElementById('popup-overlay').classList.remove('visible');
  }

  // === Render All ===
  function renderAll() {
    renderStatusBanner();
    renderMatrix();
    renderTimelineBillSelector();
    renderCompareBillSelector();
    renderAbout();
    updateLastUpdated();
  }

  // === Status Banner ===
  function renderStatusBanner() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    const el = document.getElementById('status-banner');
    if (fyData && fyData.status) {
      el.innerHTML = '<div class="banner-inner"><strong>FY' + currentFY + ' Status:</strong> ' + esc(fyData.status) + '</div>';
    } else {
      el.innerHTML = '';
    }
  }

  // === Matrix ===
  function renderMatrix() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;

    const stages = APPROPRIATIONS_DATA.stageDefinitions;
    const thead = document.getElementById('matrix-head');
    const tbody = document.getElementById('matrix-body');

    // Header
    let headerHTML = '<tr><th>Bill</th>';
    stages.forEach(s => {
      headerHTML += '<th title="' + esc(s.description) + '">' + esc(s.shortLabel) + '</th>';
    });
    headerHTML += '</tr>';
    thead.innerHTML = headerHTML;

    // Body
    let bodyHTML = '';
    fyData.bills.forEach(bill => {
      bodyHTML += '<tr>';
      bodyHTML += '<td>';
      bodyHTML += '<span>' + esc(bill.shortName) + '</span>';
      if (bill.congressGovBillNumber || bill.senateBillNumber) {
        let nums = [];
        if (bill.congressGovBillNumber) nums.push(bill.congressGovBillNumber);
        if (bill.senateBillNumber) nums.push(bill.senateBillNumber);
        bodyHTML += '<span class="bill-number">' + esc(nums.join(' / ')) + '</span>';
      }
      bodyHTML += '</td>';

      stages.forEach(stage => {
        const stageData = bill.stages[stage.id];
        if (!stageData) {
          bodyHTML += '<td class="cell-unavailable"><span class="cell-icon">&mdash;</span></td>';
          return;
        }

        if (stageData.available && stageData.documents && stageData.documents.length) {
          bodyHTML += '<td class="cell-available" data-bill="' + esc(bill.id) + '" data-stage="' + esc(stage.id) + '">';
          bodyHTML += '<span class="cell-icon">&#9679;</span>';
          if (stageData.date) bodyHTML += '<span class="cell-date">' + shortDate(stageData.date) + '</span>';
          if (stageData.vote && !stageData.vote.includes('failed')) bodyHTML += '<span class="cell-vote">' + esc(stageData.vote) + '</span>';
          bodyHTML += '</td>';
        } else if (stageData.available && stageData.inferredFromIntroduction) {
          bodyHTML += '<td class="cell-partial" data-bill="' + esc(bill.id) + '" data-stage="' + esc(stage.id) + '">';
          bodyHTML += '<span class="cell-icon">&#9675;</span>';
          if (stageData.date) bodyHTML += '<span class="cell-date">' + shortDate(stageData.date) + '</span>';
          bodyHTML += '</td>';
        } else if (stageData.vote && stageData.vote.includes('failed')) {
          bodyHTML += '<td class="cell-failed">';
          bodyHTML += '<span class="cell-icon">&#10005;</span>';
          bodyHTML += '<span class="cell-vote" style="color:var(--red)">' + esc(stageData.vote) + '</span>';
          bodyHTML += '</td>';
        } else if (stageData.note) {
          bodyHTML += '<td class="cell-unavailable">';
          bodyHTML += '<span class="cell-note">' + truncate(stageData.note, 30) + '</span>';
          bodyHTML += '</td>';
        } else {
          bodyHTML += '<td class="cell-unavailable"><span class="cell-icon">&mdash;</span></td>';
        }
      });

      bodyHTML += '</tr>';
    });

    tbody.innerHTML = bodyHTML;

    // Add click handlers
    tbody.querySelectorAll('.cell-available, .cell-partial').forEach(cell => {
      cell.addEventListener('click', () => {
        showPopup(cell.dataset.bill, cell.dataset.stage);
      });
    });
  }

  // === Timeline ===
  function renderTimelineBillSelector() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const select = document.getElementById('timeline-bill-select');
    select.innerHTML = fyData.bills.map(b =>
      '<option value="' + esc(b.id) + '">' + esc(b.shortName) + ' - ' + esc(b.fullName) + '</option>'
    ).join('');
    select.removeEventListener('change', renderTimeline);
    select.addEventListener('change', renderTimeline);
    renderTimeline();
  }

  function renderTimeline() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const billId = document.getElementById('timeline-bill-select').value;
    const bill = fyData.bills.find(b => b.id === billId);
    if (!bill) return;

    const stages = APPROPRIATIONS_DATA.stageDefinitions;
    const container = document.getElementById('timeline-container');

    let html = '<div class="timeline-track">';

    stages.forEach(stageDef => {
      const stage = bill.stages[stageDef.id];
      let status = 'pending';
      if (stage && stage.available && (stage.documents && stage.documents.length || stage.inferredFromIntroduction)) {
        status = 'active';
      } else if (stage && stage.vote && stage.vote.includes('failed')) {
        status = 'failed';
      }

      html += '<div class="timeline-item">';
      html += '<div class="timeline-dot ' + status + '"></div>';
      html += '<div class="timeline-card ' + status + '">';
      html += '<h4>' + esc(stageDef.label) + '</h4>';

      if (stage && stage.date) {
        html += '<div class="timeline-date">' + formatDate(stage.date);
        if (stage.vote) html += ' &bull; Vote: ' + esc(stage.vote);
        html += '</div>';
      } else {
        html += '<div class="timeline-date">Not yet reached</div>';
      }

      if (stage && stage.documents && stage.documents.length) {
        html += '<ul class="timeline-docs">';
        stage.documents.forEach(doc => {
          html += '<li><a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + getDocIcon(doc.format) + ' ' + esc(doc.label) + '</a></li>';
        });
        html += '</ul>';
      }

      if (stage && stage.summary) {
        html += '<div class="timeline-summary">' + esc(stage.summary) + '</div>';
      }

      if (stage && stage.note) {
        html += '<div class="timeline-summary">' + esc(stage.note) + '</div>';
      }

      html += '</div></div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // === Compare ===
  function renderCompareBillSelector() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const billSelect = document.getElementById('compare-bill');
    billSelect.innerHTML = fyData.bills.map(b =>
      '<option value="' + esc(b.id) + '">' + esc(b.shortName) + (b.congressGovBillNumber ? ' (' + b.congressGovBillNumber + ')' : '') + '</option>'
    ).join('');
    billSelect.removeEventListener('change', updateCompareStages);
    billSelect.addEventListener('change', updateCompareStages);
    updateCompareStages();

    document.getElementById('btn-compare').removeEventListener('click', doCompare);
    document.getElementById('btn-compare').addEventListener('click', doCompare);
  }

  function updateCompareStages() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const billId = document.getElementById('compare-bill').value;
    const bill = fyData.bills.find(b => b.id === billId);
    if (!bill) return;

    const stages = APPROPRIATIONS_DATA.stageDefinitions;
    const availableStages = stages.filter(s => {
      const sd = bill.stages[s.id];
      return sd && sd.available && (sd.documents && sd.documents.length || sd.inferredFromIntroduction);
    });

    const opts = availableStages.map(s => '<option value="' + esc(s.id) + '">' + esc(s.label) + '</option>').join('');

    document.getElementById('compare-stage-a').innerHTML = opts;
    document.getElementById('compare-stage-b').innerHTML = opts;

    const selB = document.getElementById('compare-stage-b');
    if (availableStages.length > 1) {
      selB.selectedIndex = 1;
    }
  }

  function doCompare() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (!fyData) return;
    const billId = document.getElementById('compare-bill').value;
    const bill = fyData.bills.find(b => b.id === billId);
    if (!bill) return;

    const stageAId = document.getElementById('compare-stage-a').value;
    const stageBId = document.getElementById('compare-stage-b').value;
    const stageA = bill.stages[stageAId];
    const stageB = bill.stages[stageBId];
    const stageADef = APPROPRIATIONS_DATA.stageDefinitions.find(s => s.id === stageAId);
    const stageBDef = APPROPRIATIONS_DATA.stageDefinitions.find(s => s.id === stageBId);

    const container = document.getElementById('compare-results');

    if (!stageA || !stageB) {
      container.innerHTML = '<div class="compare-empty">Select two valid stages to compare.</div>';
      return;
    }

    if (stageAId === stageBId) {
      container.innerHTML = '<div class="compare-empty">Select two different stages to compare.</div>';
      return;
    }

    // Build the comparison view
    let html = '';

    // Document links panel
    html += '<div class="compare-panel">';

    // Side A
    html += '<div class="compare-side">';
    html += '<h4>' + esc(stageADef.label) + (stageA.date ? ' (' + formatDate(stageA.date) + ')' : '') + '</h4>';
    if (stageA.documents && stageA.documents.length) {
      html += '<ul class="compare-doc-list">';
      stageA.documents.forEach(doc => {
        html += '<li><a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + getDocIcon(doc.format) + ' ' + esc(doc.label) + '</a></li>';
      });
      html += '</ul>';
    }
    if (stageA.vote) html += '<p style="font-weight:600;margin-top:0.5rem">Vote: ' + esc(stageA.vote) + '</p>';
    if (stageA.summary) html += '<div class="popup-summary" style="margin-top:0.5rem">' + esc(stageA.summary) + '</div>';
    html += '</div>';

    // Side B
    html += '<div class="compare-side">';
    html += '<h4>' + esc(stageBDef.label) + (stageB.date ? ' (' + formatDate(stageB.date) + ')' : '') + '</h4>';
    if (stageB.documents && stageB.documents.length) {
      html += '<ul class="compare-doc-list">';
      stageB.documents.forEach(doc => {
        html += '<li><a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + getDocIcon(doc.format) + ' ' + esc(doc.label) + '</a></li>';
      });
      html += '</ul>';
    }
    if (stageB.vote) html += '<p style="font-weight:600;margin-top:0.5rem">Vote: ' + esc(stageB.vote) + '</p>';
    if (stageB.summary) html += '<div class="popup-summary" style="margin-top:0.5rem">' + esc(stageB.summary) + '</div>';
    html += '</div>';

    html += '</div>';

    // Check if we have pre-computed diff data
    const diffKey = bill.id + ':' + stageAId + ':' + stageBId;
    if (precomputedDiffs && precomputedDiffs[diffKey]) {
      html += '<h4 style="margin:1rem 0 0.5rem;color:var(--primary)">Text Comparison (changes highlighted)</h4>';
      html += precomputedDiffs[diffKey];
      container.innerHTML = html;
      return;
    }
    // Try loading pre-computed diffs
    else if (!precomputedDiffs && !diffsLoading) {
      html += '<div id="diff-output"><div class="diff-loading"><div class="spinner"></div><br>Loading comparison data...</div></div>';
      container.innerHTML = html;
      loadPrecomputedDiffs().then(() => doCompare());
      return;
    }
    // Check if both stages have HTM documents we can fetch and diff
    else {
      const htmA = findHtmDoc(stageA);
      const htmB = findHtmDoc(stageB);

      if (htmA && htmB) {
        html += '<div id="diff-output"><div class="diff-loading"><div class="spinner"></div><br>Fetching bill text and computing diff...</div></div>';
        container.innerHTML = html;
        fetchAndDiff(htmA, htmB);
        return;
      } else {
        // Fallback: show helpful guidance
        html += renderComparisonGuidance(stageA, stageB, stageADef, stageBDef, bill);
      }
    }

    container.innerHTML = html;
  }

  async function loadPrecomputedDiffs() {
    if (precomputedDiffs || diffsLoading) return;
    diffsLoading = true;
    try {
      const resp = await fetch('diffs.json');
      if (resp.ok) {
        precomputedDiffs = await resp.json();
        console.log('Loaded ' + Object.keys(precomputedDiffs).length + ' pre-computed diffs');
      }
    } catch (e) {
      console.warn('Could not load pre-computed diffs:', e);
      precomputedDiffs = {};
    }
    diffsLoading = false;
  }

  function findHtmDoc(stage) {
    if (!stage || !stage.documents) return null;
    const htm = stage.documents.find(d => d.format === 'htm' || d.format === 'html');
    return htm ? htm.url : null;
  }

  async function fetchAndDiff(urlA, urlB) {
    const diffOutput = document.getElementById('diff-output');
    if (!diffOutput) return;

    try {
      // Try fetching both texts - Congress.gov may or may not allow CORS
      const [responseA, responseB] = await Promise.all([
        fetch(urlA).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }),
        fetch(urlB).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      ]);

      const textA = TextDiff.htmlToText(responseA);
      const textB = TextDiff.htmlToText(responseB);

      const ops = TextDiff.diff(textA, textB);
      const result = TextDiff.renderCompactDiff(ops);

      diffOutput.innerHTML = '<h4 style="margin:1rem 0 0.5rem;color:var(--primary)">Text Comparison (changes only)</h4>' + result.html;

    } catch (err) {
      // CORS or network error - show fallback
      diffOutput.innerHTML = '<div class="diff-fallback">' +
        '<strong>Direct text comparison unavailable</strong> (cross-origin restriction). ' +
        'To compare these versions:<br><br>' +
        '1. Open both bill text links above in separate browser tabs<br>' +
        '2. Copy the text from each<br>' +
        '3. Paste into <a href="https://www.diffchecker.com" target="_blank">DiffChecker</a> or a similar tool<br><br>' +
        'Or download the HTML files and use a local diff tool (e.g., <code>diff</code>, VS Code, or WinMerge).' +
        '</div>';
    }
  }

  function renderComparisonGuidance(stageA, stageB, stageADef, stageBDef, bill) {
    let html = '<div style="padding:1rem;border-top:1px solid var(--border);background:var(--bg)">';
    html += '<h4 style="margin-bottom:0.5rem;color:var(--primary)">How to Compare These Versions</h4>';

    // Check if both have PDFs
    const pdfA = stageA && stageA.documents ? stageA.documents.find(d => d.format === 'pdf' && d.type === 'bill_text') : null;
    const pdfB = stageB && stageB.documents ? stageB.documents.find(d => d.format === 'pdf' && d.type === 'bill_text') : null;

    if (pdfA && pdfB) {
      html += '<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem">';
      html += 'Both versions are available as PDF. To compare:</p>';
      html += '<ol style="font-size:0.85rem;color:var(--text-muted);padding-left:1.5rem">';
      html += '<li>Download both PDF files using the links above</li>';
      html += '<li>Use <a href="https://draftable.com/compare" target="_blank">Draftable</a> (online PDF comparison) or <a href="https://www.diffchecker.com/pdf-diff/" target="_blank">DiffChecker PDF</a></li>';
      html += '<li>Upload Version A and Version B to see highlighted changes</li>';
      html += '</ol>';
    } else {
      html += '<p style="font-size:0.85rem;color:var(--text-muted)">';
      html += 'Download the documents from both stages using the links above, then use a diff tool to compare them.';
      html += '</p>';
    }

    // Amendments context
    if (stageADef.id === 'subcommittee_bill' && stageBDef.id === 'full_committee_bill') {
      html += '<p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.75rem">';
      html += '<strong>Note:</strong> Differences between subcommittee and full committee versions typically result from amendments adopted during the full committee markup.';
      if (bill.stages.full_committee_amendments && bill.stages.full_committee_amendments.available) {
        html += ' Check the <strong>Full Committee Amendments</strong> documents for details on what was changed.';
      }
      html += '</p>';
    } else if (stageADef.id === 'full_committee_bill' && stageBDef.id === 'house_passed') {
      html += '<p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.75rem">';
      html += '<strong>Note:</strong> Differences between the committee version and floor-passed version result from floor amendments adopted during House debate.';
      html += '</p>';
    }

    html += '</div>';
    return html;
  }

  function renderCompare() {
    updateCompareStages();
  }

  // === About ===
  function renderAbout() {
    const billsList = document.getElementById('about-bills-list');
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    if (fyData) {
      billsList.innerHTML = fyData.bills.map(b =>
        '<li><strong>' + esc(b.shortName) + '</strong> - ' + esc(b.fullName) + '</li>'
      ).join('');
    }

    const processFlow = document.getElementById('process-flow');
    const stages = APPROPRIATIONS_DATA.stageDefinitions;
    processFlow.innerHTML = stages.map((s, i) => {
      let html = '<div class="process-step">';
      html += '<div class="process-step-box">' + esc(s.shortLabel) + '</div>';
      if (i < stages.length - 1) html += '<span class="process-arrow">&rarr;</span>';
      html += '</div>';
      return html;
    }).join('');
  }

  // === Update timestamps ===
  function updateLastUpdated() {
    const fyData = APPROPRIATIONS_DATA.fiscalYears[currentFY];
    const dateStr = fyData ? fyData.lastUpdated : '';
    document.getElementById('last-updated').textContent = dateStr ? 'Data as of ' + formatDate(dateStr) : '';
    document.getElementById('footer-updated').textContent = dateStr ? formatDate(dateStr) : '';
  }

  // === Utilities ===
  function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function shortDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(2);
  }

  function truncate(str, len) {
    if (!str) return '';
    return str.length > len ? str.slice(0, len) + '...' : str;
  }

  function getDocIcon(format) {
    switch (format) {
      case 'pdf': return '&#128196;';
      case 'htm': case 'html': return '&#127760;';
      case 'xml': return '&#128195;';
      case 'link': return '&#128279;';
      default: return '&#128196;';
    }
  }

})();
