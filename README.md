# 🎰 **Spin & Pick** Safari Extension - In Progress

**Spin & Pick** is a Safari extension that helps you discover books, movies, and other content by picking a random title from a list of articles, books, movies, etc., scanned from popular websites. With a single click, you'll get a fun roulette wheel that lets you spin for your next favorite title! 😎

---

## 🛠️ **Features**:
- **Scan and Identify**: Scans web pages like Goodreads, Amazon Books, Prime Video, Netflix, and more to identify titles of books, articles, movies, etc. 📚🎬
- **Pick a Random Title**: When the extension icon is clicked, it displays a roulette wheel with all the collected titles. 🌀
- **Add/Remove Titles**: You can add or remove titles from the list before spinning the wheel. 📝✂️
- **Easy Integration**: Works seamlessly with popular websites like Amazon, Netflix, and Goodreads. 🌐

---

## 🏗️ **Step-by-Step Setup**:

### 1. **Create a New Safari Extension** 🧑‍💻
   - Open Xcode and create a new Safari Web Extension project.
   - Select **Swift** as the programming language.
   - Create your project structure with `manifest.json`, `content.js`, and other necessary files.

### 2. **Add the Core Files** 📂
   - **manifest.json**: Defines the extension’s permissions and settings.
   - **content.js**: Scans the web page for titles like books, movies, or articles.
   - **popup.html, popup.css, popup.js**: Creates the roulette wheel UI and handles title selection and removal.
   - **background.js**: Manages interactions between the web page and the popup.

### 3. **Connect and Test** 🧪
   - Use Safari’s **Developer Mode** to test your extension on websites like Goodreads, Amazon, Netflix, and more.
   - Enable the extension, and when you click on the icon, you’ll see a roulette wheel with a list of titles ready to spin! 🏆🎡

---

## 🔥 **How It Works**:

1. **Scan Titles**: The extension scans the webpage for titles (like books, articles, and movies).
2. **Display Roulette Wheel**: Clicking on the extension icon opens a roulette wheel with the parsed titles.
3. **Spin and Pick**: The user can spin the wheel to randomly choose a title, or modify the list by adding or removing titles. 🎯
4. **Enjoy**: Pick your next book or movie with ease and fun! 📖🍿

---

## 📋 **How to Use**:
1. **Install the Extension** in Safari by following the setup steps.
2. **Click the Extension Icon** in the Safari toolbar to open the roulette wheel.
3. **Spin the Wheel** to get a random title, or add/remove items as you wish! 🎉
4. **Discover your next favorite title** and enjoy your reading or movie experience! 📚🎬

---

## 🛠️ **Tech Stack**:

- **JavaScript**: Used for parsing titles and controlling the roulette wheel.
- **HTML/CSS**: For creating the user interface of the popup and roulette wheel.
- **Swift**: Used for wrapping the Safari Web Extension and enabling integration with Safari.
- **JSON**: For storing the titles and settings.
