/* Imgur Upload Script - Truong Blogger*/
! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Imgur = e()
}(this, function() {
    "use strict";
    var e = function(t) {
        if (!(this && this instanceof e)) return new e(t);
        if (!(t = t || {}).clientid) throw "Provide a valid Client Id here: https://api.imgur.com/";
        this.clientid = t.clientid, this.endpoint = "https://api.imgur.com/3/image", this.callback = t.callback || void 0, this.dropzone = document.querySelectorAll(".dropzone"), this.infoimg = document.querySelectorAll(".infoimg"), this.run()
    };
    return e.prototype = {
        createEls: function(t, e, i) {
            var a, n = document.createElement(t);
            for (a in e) e.hasOwnProperty(a) && (n[a] = e[a]);
            return i && n.appendChild(document.createTextNode(i)), n
        },
        insertAfter: function(t, e) {
            t.parentNode.insertBefore(e, t.nextSibling)
        },
        post: function(t, e, i) {
            var a = new XMLHttpRequest;
            a.open("POST", t, !0), a.setRequestHeader("Authorization", "Client-ID " + this.clientid), a.onreadystatechange = function() {
                if (4 === this.readyState) {
                    if (!(200 <= this.status && this.status < 300)) throw new Error(this.status + " - " + this.statusText);
                    var e = "";
                    try {
                        e = JSON.parse(this.responseText)
                    } catch (t) {
                        e = this.responseText
                    }
                    i.call(window, e)
                }
            }, a.send(e), a = null
        },
        createDragZone: function() {
            var e = this.createEls("p", {}, "Kéo và thả hình ảnh vào đây!"),
                i = this.createEls("p", {}, "Hoặc click để chọn ảnh"),
                a = this.createEls("input", {
                    type: "file",
                    className: "input",
                    accept: "image/*"
                });
            Array.prototype.forEach.call(this.infoimg, function(t) {
                t.appendChild(e), t.appendChild(i)
            }.bind(this)), Array.prototype.forEach.call(this.dropzone, function(t) {
                t.appendChild(a), this.status(t), this.upload(t)
            }.bind(this))
        },
        loading: function() {
            var t = this.createEls("div", {
                    className: "loading-modal"
                }),
                e = this.createEls("table", {
                    className: "loading-table"
                }),
                i = this.createEls("img", {
                    className: "loading-image",
                    src: "https://firebasestorage.googleapis.com/v0/b/huydc-090288.appspot.com/o/Images%20Upload%2Floading-spin.svg?alt=media&token=8a1fd8dc-30b2-4b74-acc6-9e4ce55a89b0"
                });
            t.appendChild(e), e.appendChild(i), document.body.appendChild(t)
        },
        status: function(t) {
            var e = this.createEls("div", {
                className: "status"
            });
            this.insertAfter(t, e)
        },
        matchFiles: function(t, e) {
            var i = e.nextSibling;
            t.type.match(/image/) && "image/svg+xml" !== t.type ? (document.body.classList.add("loading"), i.classList.remove("bg-success", "bg-danger"), i.innerHTML = "", (e = new FormData).append("image", t), this.post(this.endpoint, e, function(t) {
                document.body.classList.remove("loading"), "function" == typeof this.callback && this.callback.call(this, t)
            }.bind(this))) : (i.classList.remove("bg-success"), i.classList.add("bg-danger"), i.innerHTML = "Invalid archive")
        },
        upload: function(i) {
            var e, a, n, s;
            i.addEventListener("change", function(t) {
                if (t.target && "INPUT" === t.target.nodeName && "file" === t.target.type)
                    for (a = t.target.files, n = 0, s = a.length; n < s; n += 1) e = a[n], this.matchFiles(e, i)
            }.bind(this), !1), ["dragenter", "dragleave", "dragover", "drop"].map(function(e) {
                i.addEventListener(e, function(t) {
                    t.target && "INPUT" === t.target.nodeName && "file" === t.target.type && ("dragleave" === e || "drop" === e ? t.target.parentNode.classList.remove("dropzone-dragging") : t.target.parentNode.classList.add("dropzone-dragging"))
                }, !1)
            })
        },
        run: function() {
            document.querySelector(".loading-modal") || this.loading(), this.createDragZone()
        }
    }, e
});
