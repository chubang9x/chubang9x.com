/* Imgur ID Script - Truong Blogger*/
var feedback = function(c) {
    !0 === c.success && (c = c.data.link.replace(/^http:\/\//i, "https://"), document.querySelector(".status").classList.add("bg-success"), document.querySelector(".status").innerHTML = '<div class="linkimg"><input class="image-url" id="copylinkimg" onclick="this.select()" value="' + c + '"/></div><div class="showimg"><img class="img" alt="Imgur-Upload" src="' + c + '"/></div>')
};
new Imgur({
    clientid: "e82f36a79f1653c",
    callback: feedback
});
