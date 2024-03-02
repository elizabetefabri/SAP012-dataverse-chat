const loadStyle = (stylePath) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = stylePath;
  document.querySelector('head').appendChild(link);
};

export default loadStyle;
