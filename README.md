<h1 align="center">🧮 Quick Master Calculator</h1>

<p align="center">
  A fast, responsive scientific calculator built with plain HTML, CSS and JavaScript.<br />
  No frameworks, no libraries, no <code>eval()</code>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT License" />
</p>

---

<div align="center">

## ✨ Features
</div>

**Calculations**

- Addition, subtraction, multiplication and division
- Trigonometry: `sin`, `cos`, `tan` and their inverses `sin⁻¹`, `cos⁻¹`, `tan⁻¹`
- Powers and roots: `xʸ`, `x²`, `x³`, `eˣ`, `10ˣ`, `ʸ√x`, `∛x`, `√x`
- Logarithms: `ln` and `log` (base 10)
- Constants `π` and `e`, plus `1/x`, `%` and factorial `n!`
- Scientific notation with the `EXP` button (`2EXP3` = 2000)
- Brackets, implicit multiplication (`2π`, `3sin(30)`) and a forgiving parser that accepts a missing closing bracket

**Convenience**

- **Deg / Rad toggle** that applies to every trig function and inverse trig function
- Memory keys: `MC`, `MR`, `M+`, `M-`, with an `M` indicator on the display
- `Ans` (previous answer), `RND` (random number), `±` (change sign), `Back` and `AC`
- Full keyboard support
- Starting a new number after `=` clears the old result, while an operator continues from it

**Design and quality**

- Responsive layout for desktop, tablet and mobile
- Accessible markup with `aria-label`s, tooltips and visible focus states
- Clean Deg / Rad toggle that clearly shows the active mode
- Small, readable code with a single click handler for all buttons

---

<div align="center">

## 🖼️ Preview
</div>



---

<div align="center">

## 🚀 Getting Started
</div>

No installation or build step is needed.

```bash
# 1. Clone the repository
git clone https://github.com/vaibhav-dev1707/Quick-Master-Calculator.git

# 2. Open the project folder
cd Quick-Master-Calculator
```

Then open `calculator.html` in any modern browser.

---

<div align="center">

## 🧪 Usage Examples
</div>

| You type       | Mode | Result                   |
| -------------- | ---- | ------------------------ |
| `sin(90)`      | Deg  | `1`                      |
| `sin(π/2)`     | Rad  | `1`                      |
| `asin(1)`      | Deg  | `90`                     |
| `asin(1)`      | Rad  | `1.5707963268`           |
| `5!`           | any  | `120`                    |
| `sqrt(144)`    | any  | `12`                     |
| `log(1000)`    | any  | `3`                      |
| `3` `ʸ√x` `27` | any  | `3` (the 3rd root of 27) |
| `2EXP3`        | any  | `2000`                   |
| `50%`          | any  | `0.5`                    |
| `2π`           | any  | `6.28318530718`          |

> **Tip:** the angle mode is read when you press `=`. Pick Deg or Rad first, then calculate.

---

<div align="center">

## ⌨️ Keyboard Shortcuts
</div>

| Key                 | Action                       |
| ------------------- | ---------------------------- |
| `0-9` `.`           | Enter numbers                |
| `+` `-` `*` `/` `^` | Operators                    |
| `(` `)` `!` `%`     | Brackets, factorial, percent |
| `Enter` or `=`      | Calculate                    |
| `Backspace`         | Delete the last entry        |
| `Esc`               | Clear everything             |

---

<div align="center">

## 🧠 How It Works
</div>

1. Button clicks (and key presses) build an expression string such as `sin(30)+2π`.
2. When you press `=`, a small **recursive-descent parser** reads the expression token by token. It handles operator precedence, brackets, postfix operators (`!`, `%`, `²`, `³`) and functions, and it never uses `eval()` or `new Function()`.
3. Trigonometric functions convert angles according to the current Deg / Rad mode, and tiny floating-point noise such as `sin(180) = 1.2e-16` is snapped to `0`.
4. Invalid input, division by zero and undefined values (such as `tan(90°)`) show `Error`.

---

<div align="center">

## 📂 Project Structure
</div>

```text
Quick-Master-Calculator/
├── calculator.html   # Page structure and buttons
├── calculator.css    # Layout, theme and responsive styles
├── calculator.js     # Parser, calculator logic and event handling
├── LICENSE
└── README.md
```

---

<div align="center">

## 🛠 Built With
</div>

- **HTML5**: semantic structure and data attributes for buttons
- **CSS3**: Grid, custom properties (variables) and media queries
- **JavaScript (ES6)**: expression parser, memory, keyboard input

---

<div align="center">

## 🔮 Roadmap
</div>

- [ ] Calculation history
- [ ] Dark / light theme toggle
- [ ] Copy-result button
- [ ] Automated tests for the parser

---

<div align="center">

## 🤝 Contributing
</div>

Contributions, bug reports and ideas are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Adding a new button is simple: add a `<button>` with `data-key="..."` (or `data-action="..."`) in `calculator.html`, and for a new function also add it to `FUNCS` in `calculator.js`.

---

<div align="center">

## 📄 License
</div>

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

## 👤 Author
</div>

**Vaibhav** - [@vaibhav-dev1707](https://github.com/vaibhav-dev1707)
