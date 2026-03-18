// Appropriations Bill Version Tracker - Application Logic

(function() {
  'use strict';

  let currentFY = 2026;
  let currentTab = 'matrix';

  // === Initialization ===
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupTabs();
    setupFYSelector();
    setupPopup();
    renderAll();
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
      if (bill.congressGovBillNumber) {
        bodyHTML += '<span class="bill-number">' + esc(bill.congressGovBillNumber) + '</span>';
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
      '<option value="' + esc(b.id) + '">' + esc(b.shortName) + '</option>'
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

    // Default to first and second available stages
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

    let html = '<div class="compare-panel">';

    // Side A
    html += '<div class="compare-side">';
    html += '<h4>' + esc(stageADef.label) + (stageA.date ? ' (' + formatDate(stageA.date) + ')' : '') + '</h4>';
    if (stageA.documents && stageA.documents.length) {
      html += '<ul class="compare-doc-list">';
      stageA.documents.forEach(doc => {
        html += '<li><a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + getDocIcon(doc.format) + ' ' + esc(doc.label) + '</a></li>';
      });
      html += '</ul>';
    } else {
      html += '<p style="color:var(--text-muted);font-size:0.85rem">No direct documents available at this stage.</p>';
    }
    if (stageA.vote) html += '<p style="font-weight:600;margin-top:0.5rem">Vote: ' + esc(stageA.vote) + '</p>';
    if (stageA.summary) html += '<div class="popup-summary">' + esc(stageA.summary) + '</div>';
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
    } else {
      html += '<p style="color:var(--text-muted);font-size:0.85rem">No direct documents available at this stage.</p>';
    }
    if (stageB.vote) html += '<p style="font-weight:600;margin-top:0.5rem">Vote: ' + esc(stageB.vote) + '</p>';
    if (stageB.summary) html += '<div class="popup-summary">' + esc(stageB.summary) + '</div>';
    html += '</div>';

    html += '</div>';

    // Comparison notes
    if (stageAId !== stageBId) {
      html += '<div style="padding:1rem;border-top:1px solid var(--border);background:var(--bg);font-size:0.85rem">';
      html += '<strong>Comparison Notes:</strong> ';

      if (stageAId === 'subcommittee_bill' && stageADef && (stageBId === 'full_committee_bill' || stageBId === 'house_passed')) {
        html += 'The full committee version may contain changes adopted through amendments during the markup process. ';
        html += 'Download both bill texts and use a diff tool (such as <a href="https://www.diffchecker.com" target="_blank">DiffChecker</a>) to see specific changes.';
      } else if (stageAId === 'full_committee_bill' && stageBId === 'house_passed') {
        html += 'The House-passed version may include floor amendments adopted during debate. ';
        html += 'Download both versions to compare using a diff tool.';
      } else {
        html += 'Download the bill text from both stages and use a diff tool (such as <a href="https://www.diffchecker.com" target="_blank">DiffChecker</a>) to identify specific changes between versions.';
      }
      html += '</div>';
    }

    container.innerHTML = html;
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
