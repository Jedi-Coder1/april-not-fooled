window.addEventListener("load", function() {
    function isVisble(element) {
        var elementRect = element.getBoundingClientRect(),
            t = window.innerHeight || document.documentElement.clientHeight,
            n = window.innerWidth || document.documentElement.clientWidth;
        return 0 < elementRect.bottom && 0 < elementRect.right && elementRect.top < t && elementRect.left < n
    }

    function shortsHelper(e) {
        var t = e.split("/shorts/", 2);
        return (e = 2 === (t = (e = 2 === t.length ? t[1] : t[0]).split("v=", 2)).length ? t[1] : t[0]).split("&", 1)[0]
    }

    function fetchVideoInfo(videoID, t) {
        fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({context: {client: {clientName: "WEB",clientVersion: "2.20240416.01.00"}},
                videoId: videoID
            })
        }).then(res => {
            if (res.ok) return res.json();
            throw new Error("Network response was not ok")
        }).then(res => {
            res = res.microformat.playerMicroformatRenderer;
            res.liveBroadcastDetails?.isLiveNow ? t(res.liveBroadcastDetails.startTimestamp) : res.publishDate ? t(res.publishDate) : t(res.uploadDate)
        }).catch(res => {console.error("There was a problem with the fetch operation:", res)})
    }

    function LocalizeDates(e) {
        var e = new Date(e),
            t = navigator.language || "en-US";
        return e.toLocaleDateString(t, {day: "numeric", month: "short", year: "numeric"})
    }

    function t() {
        if (n = function() {
                var t = document.body.querySelector("player-microformat-renderer script");
                if (t) {
                    let e = t.textContent.split('"startDate":"', 2);
                    if (2 == e.length) return e[1].split('"', 1)[0];
                    if (2 == (e = t.textContent.split('"publishDate":"', 2)).length) return e[1].split('"', 1)[0];
                    if (2 == (e = t.textContent.split('"uploadDate":"', 2)).length) return e[1].split('"', 1)[0]
                }
                return null
            }()) {
            var t, n = LocalizeDates(n);
            (function() {
                var e = document.body.querySelector("player-microformat-renderer script");
                if (!e) return null;
                let t = e.textContent.split('"isLiveBroadcast":', 2);
                return 2 == t.length && !!t[1].split(",", 1)[0] && 2 != (t = e.textContent.split('"endDate":"', 2)).length
            })() ? document.body.classList.add("ytud-description-live"): document.body.classList.remove("ytud-description-live");
            let e = document.querySelector("#info-container > #info > b");
            e ? (e.parentNode.children[1] !== e && (t = e.parentNode, e = t.removeChild(e), t.children[0].insertAdjacentElement("afterend", e)), e.firstChild.nodeValue !== n && (e.firstChild.nodeValue = n)) : (t = document.querySelector("#info-container > #info > span:nth-child(1)")) && ((e = document.createElement("b")).textContent = n, t.insertAdjacentElement("afterend", e))
        }
    }
    setInterval(() => {
        var e;
        t(), 0 !== (e = document.querySelectorAll("#items > ytd-item-section-renderer > #contents > ytd-compact-video-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r == a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "video page sidebar list"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#contents > ytd-rich-grid-row > #contents > ytd-rich-item-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "homepage list - videos"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("ytd-rich-shelf-renderer > #dismissible > #contents > ytd-rich-item-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "homepage list - shorts"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#contents > ytd-item-section-renderer > #contents > ytd-video-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "search list - videos"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#scroll-container > #items > ytd-reel-item-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "search list - shorts"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("ytd-shelf-renderer > #dismissible > #contents > ytd-vertical-list-renderer > #items > ytd-video-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "search list - people also watched"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#lists > ytd-vertical-watch-card-list-renderer > #items > ytd-watch-card-compact-video-renderer")).length && e.forEach(e => {
            var a = e.querySelectorAll("div.text-wrapper > yt-formatted-string.subtitle");
            if (0 !== a.length) {
                let n = a[0];
                a = n.firstChild.nodeValue.split(" • ", 2);
                if (!(a.length < 2)) {
                    let t = a[0] + " • ";
                    var a = a[1],
                        r = n.getAttribute("data-text");
                    null !== r && r === a || isVisble(n) && (n.setAttribute("data-text", a), r = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(r, "search list - topic in sidebar"), fetchVideoInfo(r, e => {
                        e = LocalizeDates(e), n.firstChild.nodeValue = t + e, n.setAttribute("data-text", e)
                    }))
                }
            }
        }), 0 !== (e = document.querySelectorAll("#contents > ytd-channel-featured-content-renderer > #contents > ytd-video-renderer > #dismissible")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "channel page - home (featured video)"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#contents > ytd-item-section-renderer > #contents > ytd-channel-video-player-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("ytd-video-meta-block > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "inline-metadata-item style-scope ytd-video-meta-block", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("#metadata-container > yt-formatted-string > a.yt-simple-endpoint").getAttribute("href")), s && utility(n, "channel page - home (featured video)"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#scroll-container > #items > ytd-grid-video-renderer")).length && e.forEach(e => {
            var n = e.querySelectorAll("#metadata-container > #metadata > #metadata-line > span");
            if (0 !== n.length) {
                let t;
                var a = (t = 1 === n.length ? ((r = document.createElement("span")).className = "style-scope ytd-grid-video-renderer", a = document.createTextNode(""), r.appendChild(a), n[0].insertAdjacentElement("afterend", r), r) : n[1]).firstChild.nodeValue,
                    r = t.getAttribute("data-text");
                null !== r && r === a || isVisble(t) && (t.setAttribute("data-text", a), n = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(n, "channel page - home (for you videos)"), fetchVideoInfo(n, e => {
                    e = LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        }), 0 !== (e = document.querySelectorAll("#contents > ytd-playlist-video-list-renderer > #contents > ytd-playlist-video-renderer")).length && e.forEach(e => {
            var a = e.querySelectorAll("#video-info > span");
            if (!(a.length < 2)) {
                let t, n = "";
                2 === a.length ? ((l = document.createElement("span")).className = "style-scope yt-formatted-string", l.setAttribute("dir", "auto"), r = document.createTextNode(""), l.appendChild(r), a[1].insertAdjacentElement("afterend", l), t = l, n = " • ") : t = a[2];
                var r = t.firstChild.nodeValue,
                    l = t.getAttribute("data-text");
                null !== l && l === r || isVisble(t) && (t.setAttribute("data-text", r), a = shortsHelper(e.querySelector("a#thumbnail").getAttribute("href")), s && utility(a, "video playlist"), fetchVideoInfo(a, e => {
                    e = n + LocalizeDates(e), t.firstChild.nodeValue = e, t.setAttribute("data-text", e)
                }))
            }
        })
    }, 1e3);
    var e = document.createElement("style");
    e.textContent = "#info > span:nth-child(3) {display:none !important;}#info > span:nth-child(4) {display:none !important;}#info > b {font-weight:500 !important;margin-left:6px !important;}#date-text {display:none !important;}.ytud-description-live #info > span:nth-child(1) {display:none !important;}.ytud-description-live #info > b {margin-left:0 !important;margin-right:6px !important;}", document.head.appendChild(e);
    let s = !1,
        a = 0,
        r;

    function utility(e, t) {
        r || ((r = document.createElement("span")).id = "ytud-counter", r.innerText = "0", r.style.cssText = "position: fixed; top: 0; left: 0; width: 30px; height: 30px; background-color: red; color: white; text-align: center; line-height: 30px; font-size: 16px; font-weight: bold; border-radius: 5px; z-index: 9999;", document.body.appendChild(r)), a++, r.textContent = a;
        var n = document.createElement("span");
        n.style.cssText = "position: fixed; left: 0; height: 30px; background-color: black; color: red; text-align: left; line-height: 30px; font-size: 16px; font-weight: bold; border-radius: 5px; z-index: 9999;", n.style.top = 30 * a + "px", n.textContent = e + " " + t, document.body.appendChild(n)
    }
});