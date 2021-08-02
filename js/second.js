const query = (node) => document.querySelector(node);


const dropdown1 = query("#dropdown1");
const dropdownMenu1 = query("#dropdownMenu1");
dropdown1.addEventListener("click", () => {
	dropdownMenu1.classList.toggle("hide")
})

const theme = localStorage.getItem("theme");
if (theme) {
	// body.classList.add(theme);
	document.body.classList.toggle(theme);
}
// Select the button
const darkBtn = query("#toggledark");
// Listen for a click on the button
darkBtn.addEventListener("click", function () { switchTheme("dark-theme"); });
function switchTheme(themeName) {
	document.body.classList.toggle(themeName);
	if (!theme) {
		localStorage.setItem("theme", "dark-theme");
	} else {
		localStorage.removeItem("theme");
	}
}

var html = document.getElementsByTagName('html')[0];
function fontSize(size = "10%") {
	html.style.fontSize = size
}