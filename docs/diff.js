// Simple text diff library for comparing bill versions
// Uses a basic LCS (Longest Common Subsequence) approach

const TextDiff = (function() {
  'use strict';

  // Split text into meaningful chunks (paragraphs/sections for bill text)
  function tokenize(text) {
    // Normalize whitespace and split into lines
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  // Compute LCS table
  function lcsTable(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1).fill(0);
    }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp;
  }

  // Backtrack to find diff operations
  function backtrack(dp, a, b) {
    const ops = [];
    let i = a.length;
    let j = b.length;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
        ops.unshift({ type: 'equal', text: a[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        ops.unshift({ type: 'add', text: b[j - 1] });
        j--;
      } else {
        ops.unshift({ type: 'remove', text: a[i - 1] });
        i--;
      }
    }

    return ops;
  }

  // Main diff function
  function diff(textA, textB) {
    const a = tokenize(textA);
    const b = tokenize(textB);

    // For very long texts, use a chunked approach
    if (a.length > 2000 || b.length > 2000) {
      return chunkDiff(a, b);
    }

    const dp = lcsTable(a, b);
    return backtrack(dp, a, b);
  }

  // Chunked diff for long documents - diff by sections
  function chunkDiff(a, b) {
    const chunkSize = 500;
    const results = [];

    // Simple approach: diff in chunks
    const maxLen = Math.max(a.length, b.length);
    for (let start = 0; start < maxLen; start += chunkSize) {
      const chunkA = a.slice(start, start + chunkSize);
      const chunkB = b.slice(start, start + chunkSize);
      if (chunkA.length === 0 && chunkB.length === 0) break;
      if (chunkA.length === 0) {
        chunkB.forEach(line => results.push({ type: 'add', text: line }));
      } else if (chunkB.length === 0) {
        chunkA.forEach(line => results.push({ type: 'remove', text: line }));
      } else {
        const dp = lcsTable(chunkA, chunkB);
        const chunkOps = backtrack(dp, chunkA, chunkB);
        results.push(...chunkOps);
      }
    }
    return results;
  }

  // Render diff as HTML
  function renderDiff(ops) {
    const stats = { added: 0, removed: 0, unchanged: 0 };
    let html = '<div class="diff-container">';

    // Summary stats
    ops.forEach(op => {
      if (op.type === 'add') stats.added++;
      else if (op.type === 'remove') stats.removed++;
      else stats.unchanged++;
    });

    html += '<div class="diff-stats">';
    html += '<span class="diff-stat-unchanged">' + stats.unchanged + ' unchanged lines</span>';
    html += '<span class="diff-stat-added">+' + stats.added + ' added</span>';
    html += '<span class="diff-stat-removed">-' + stats.removed + ' removed</span>';
    html += '</div>';

    html += '<div class="diff-body">';

    let lineA = 0, lineB = 0;
    ops.forEach(op => {
      const escaped = escDiff(op.text);
      if (op.type === 'equal') {
        lineA++;
        lineB++;
        html += '<div class="diff-line diff-equal">';
        html += '<span class="diff-gutter">' + lineA + '</span>';
        html += '<span class="diff-gutter">' + lineB + '</span>';
        html += '<span class="diff-marker">&nbsp;</span>';
        html += '<span class="diff-text">' + escaped + '</span>';
        html += '</div>';
      } else if (op.type === 'remove') {
        lineA++;
        html += '<div class="diff-line diff-removed">';
        html += '<span class="diff-gutter">' + lineA + '</span>';
        html += '<span class="diff-gutter"></span>';
        html += '<span class="diff-marker">-</span>';
        html += '<span class="diff-text">' + escaped + '</span>';
        html += '</div>';
      } else if (op.type === 'add') {
        lineB++;
        html += '<div class="diff-line diff-added">';
        html += '<span class="diff-gutter"></span>';
        html += '<span class="diff-gutter">' + lineB + '</span>';
        html += '<span class="diff-marker">+</span>';
        html += '<span class="diff-text">' + escaped + '</span>';
        html += '</div>';
      }
    });

    html += '</div></div>';
    return { html, stats };
  }

  // Render a compact summary diff (collapsed equal sections)
  function renderCompactDiff(ops) {
    const stats = { added: 0, removed: 0, unchanged: 0 };
    ops.forEach(op => {
      if (op.type === 'add') stats.added++;
      else if (op.type === 'remove') stats.removed++;
      else stats.unchanged++;
    });

    let html = '<div class="diff-container">';
    html += '<div class="diff-stats">';
    html += '<span class="diff-stat-unchanged">' + stats.unchanged + ' unchanged</span>';
    html += '<span class="diff-stat-added">+' + stats.added + ' added</span>';
    html += '<span class="diff-stat-removed">-' + stats.removed + ' removed</span>';
    html += '</div>';

    html += '<div class="diff-body diff-compact">';

    const CONTEXT = 3; // lines of context around changes
    let lineA = 0, lineB = 0;
    let buffer = [];
    let lastChangeIdx = -999;

    ops.forEach((op, idx) => {
      if (op.type === 'equal') {
        lineA++;
        lineB++;
      } else if (op.type === 'remove') {
        lineA++;
      } else {
        lineB++;
      }

      if (op.type !== 'equal') {
        // Show context before this change
        const contextStart = Math.max(0, idx - CONTEXT);
        for (let c = contextStart; c < idx; c++) {
          if (c > lastChangeIdx + CONTEXT && ops[c].type === 'equal') {
            buffer.push(renderDiffLine(ops[c], c, ops));
          }
        }
        buffer.push(renderDiffLine(op, idx, ops));
        lastChangeIdx = idx;
      } else if (idx <= lastChangeIdx + CONTEXT && lastChangeIdx >= 0) {
        buffer.push(renderDiffLine(op, idx, ops));
      } else if (idx === lastChangeIdx + CONTEXT + 1 && lastChangeIdx >= 0) {
        // Add separator
        buffer.push('<div class="diff-separator">...</div>');
      }
    });

    html += buffer.join('');
    html += '</div></div>';
    return { html, stats };
  }

  function renderDiffLine(op, idx, ops) {
    const escaped = escDiff(op.text);
    // Count line numbers
    let la = 0, lb = 0;
    for (let i = 0; i <= idx; i++) {
      if (ops[i].type === 'equal' || ops[i].type === 'remove') la++;
      if (ops[i].type === 'equal' || ops[i].type === 'add') lb++;
    }

    if (op.type === 'equal') {
      return '<div class="diff-line diff-equal"><span class="diff-gutter">' + la + '</span><span class="diff-gutter">' + lb + '</span><span class="diff-marker">&nbsp;</span><span class="diff-text">' + escaped + '</span></div>';
    } else if (op.type === 'remove') {
      return '<div class="diff-line diff-removed"><span class="diff-gutter">' + la + '</span><span class="diff-gutter"></span><span class="diff-marker">-</span><span class="diff-text">' + escaped + '</span></div>';
    } else {
      return '<div class="diff-line diff-added"><span class="diff-gutter"></span><span class="diff-gutter">' + lb + '</span><span class="diff-marker">+</span><span class="diff-text">' + escaped + '</span></div>';
    }
  }

  function escDiff(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Extract plain text from HTML (for Congress.gov bill text)
  function htmlToText(html) {
    // Remove script/style tags
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    // Convert block elements to newlines
    text = text.replace(/<\/(p|div|h[1-6]|li|tr|section|article)>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    // Remove remaining tags
    text = text.replace(/<[^>]+>/g, '');
    // Decode entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    text = textarea.value;
    // Normalize whitespace
    text = text.replace(/[ \t]+/g, ' ');
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
    return text.trim();
  }

  return {
    diff: diff,
    renderDiff: renderDiff,
    renderCompactDiff: renderCompactDiff,
    htmlToText: htmlToText,
    tokenize: tokenize
  };
})();
