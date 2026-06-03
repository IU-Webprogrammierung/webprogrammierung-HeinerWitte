async function loadComponent(selector, path) {
    const element = document.querySelector(selector);
    if (!element) return;
    const response = await fetch(path);
    const html = await response.text();
    element.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");
});