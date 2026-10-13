// ---------- State ----------
let expression = "0";
let memory = 0;
let lastAnswer = 0;
let justEvaluated = false; // true right after "=" or RND/MR, so a new digit starts fresh

const display = () => document.getElementById("display");

// ---------- Angle mode (one source of truth for every trig function) ----------
const isDeg = () => document.querySelector('input[name="mode"]:checked').value === "deg";
const toRad = (x) => (isDeg() ? (x * Math.PI) / 180 : x);
const fromRad = (x) => (isDeg() ? (x * 180) / Math.PI : x);
const snap = (v) => (Math.abs(v) < 1e-14 ? 0 : v); // sin(180) -> 0, not 1.2e-16

const FUNCS = {
  sin: (x) => snap(Math.sin(toRad(x))),
  cos: (x) => snap(Math.cos(toRad(x))),
  tan: (x) => {
    if (isDeg() && Math.abs(x % 180) === 90) throw new Error("tan undefined");
    return snap(Math.tan(toRad(x)));
  },
  asin: (x) => fromRad(Math.asin(x)),
  acos: (x) => fromRad(Math.acos(x)),
  atan: (x) => fromRad(Math.atan(x)),
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
};

function factorial(n) {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error("factorial");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// ---------- Evaluator (no eval, no string replacing) ----------
const TOKEN_RE = /(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|Ans|[a-z]+|ʸ√|[π²³!%^+\-*/()]/g;
const STARTS_FACTOR = /^(?:[\d.]|π|Ans|[a-z]|\()/;

function evaluate(src) {
  const tokens = src.match(TOKEN_RE) || [];
  if (tokens.join("") !== src) throw new Error("invalid input");
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];

  const parseExpr = () => {
    let v = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = next();
      const r = parseTerm();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  };

  const parseTerm = () => {
    let v = parseUnary();
    for (;;) {
      const t = peek();
      if (t === "*" || t === "/") {
        next();
        const r = parseUnary();
        v = t === "*" ? v * r : v / r;
      } else if (t && STARTS_FACTOR.test(t)) {
        v *= parseUnary(); // implicit multiplication: 2π, 3sin(30)
      } else return v;
    }
  };

  const parseUnary = () => {
    if (peek() === "-") { next(); return -parseUnary(); }
    if (peek() === "+") { next(); return parseUnary(); }
    return parsePower();
  };

  const parsePower = () => {
    const base = parsePostfix();
    if (peek() === "^") { next(); return Math.pow(base, parseUnary()); }
    if (peek() === "ʸ√") { next(); return Math.pow(parseUnary(), 1 / base); } // 3ʸ√27 = 3
    return base;
  };

  const parsePostfix = () => {
    let v = parsePrimary();
    for (;;) {
      const t = peek();
      if (t === "!") { next(); v = factorial(v); }
      else if (t === "%") { next(); v /= 100; }
      else if (t === "²") { next(); v = v ** 2; }
      else if (t === "³") { next(); v = v ** 3; }
      else return v;
    }
  };

  const parsePrimary = () => {
    const t = next();
    if (t === undefined) throw new Error("incomplete");
    if (/^[\d.]/.test(t)) return parseFloat(t);
    if (t === "π") return Math.PI;
    if (t === "e") return Math.E;
    if (t === "Ans") return lastAnswer;
    if (t === "(") {
      const v = parseExpr();
      if (peek() === ")") next(); // forgive a missing closing bracket
      return v;
    }
    if (FUNCS[t] && peek() === "(") {
      next();
      const v = parseExpr();
      if (peek() === ")") next();
      return FUNCS[t](v);
    }
    throw new Error("unexpected " + t);
  };

  const result = parseExpr();
  if (i < tokens.length) throw new Error("unexpected " + tokens[i]);
  if (!isFinite(result)) throw new Error("math error");
  return result;
}

// ---------- Display ----------
function formatNumber(num) {
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toPrecision(12)).toString();
}

function updateDisplay() {
  const d = display();
  d.value = expression;
  d.scrollLeft = d.scrollWidth; // keep the latest characters visible
}

function updateStatus() {
  document.getElementById("modeLabel").textContent = isDeg() ? "DEG" : "RAD";
  document.getElementById("memLabel").hidden = memory === 0;
}

// ---------- Input ----------
const CONTINUES_RESULT = /^(?:[+\-*/^²³!%]|ʸ√)/;

function press(val) {
  const token = val === "yroot" ? "ʸ√" : val;
  if (expression === "Error") expression = "0";

  if (justEvaluated && !CONTINUES_RESULT.test(token)) expression = "0";
  justEvaluated = false;

  if (expression === "0" && token !== "." && !CONTINUES_RESULT.test(token)) {
    expression = token;
  } else {
    expression += token;
  }
  updateDisplay();
}

function calculate() {
  try {
    const result = evaluate(expression);
    lastAnswer = result;
    expression = formatNumber(result);
  } catch (e) {
    expression = "Error";
  }
  justEvaluated = true;
  updateDisplay();
}

function clearDisplay() {
  expression = "0";
  justEvaluated = false;
  updateDisplay();
}

function backspace() {
  if (expression === "Error") expression = "0";
  else expression = expression.replace(/(?:asin|acos|atan|sin|cos|tan|sqrt|cbrt|ln|log|exp)\($|Ans$|ʸ√$|.$/, "") || "0";
  justEvaluated = false;
  updateDisplay();
}

function toggleSign() {
  if (expression === "0" || expression === "Error") return;
  if (/^-\(.*\)$/.test(expression)) expression = expression.slice(2, -1);
  else if (/^-[\d.]+$/.test(expression)) expression = expression.slice(1);
  else if (/^[\d.]+$/.test(expression)) expression = "-" + expression;
  else expression = "-(" + expression + ")";
  updateDisplay();
}

function randomNumber() {
  expression = Math.random().toFixed(6);
  justEvaluated = true;
  updateDisplay();
}

function answer() { press("Ans"); }

// ---------- Memory ----------
function memoryChange(sign) {
  try {
    memory += sign * evaluate(expression);
    updateStatus();
  } catch (e) { /* ignore invalid expressions */ }
}
const memoryAdd = () => memoryChange(1);
const memorySub = () => memoryChange(-1);

function memoryRecall() {
  press(formatNumber(memory));
}

function memoryClear() {
  memory = 0;
  updateStatus();
}

// ---------- Keyboard support ----------
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (/^[0-9.+\-*/^()!%]$/.test(k)) press(k);
  else if (k === "Enter" || k === "=") calculate();
  else if (k === "Backspace") backspace();
  else if (k === "Escape") clearDisplay();
  else return;
  e.preventDefault();
});

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener("change", updateStatus));
  updateDisplay();
  updateStatus();
});