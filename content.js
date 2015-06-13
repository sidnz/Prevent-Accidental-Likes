var selectors = '.UFILikeLink';
var $j = jQuery.noConflict();
var bind = true;
var state = "";

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    if (req.state === "on" || req.state == "off") {
        state = req.state;
        setState();
    }
});

$j(document).ready(function() {
    setState();
    $j("._5glz._53b").each(function(index) {
        var element = $j(this)[0];
        if ($j(element).index() == 0) {
            $j(element).addClass("confirm-_53b").removeClass("_53b");
        }
    });

    $j(".like").each(function(index) {
        var element = $j(this)[0];
        if ($j(element).index() == 0) {
            $j(element).addClass("confirm-like").removeClass("like");
        }
        if ($j(element).parent().hasClass("fbPhotosPhotoLike") && !($j(element).parent()).hasClass("viewerLikesThis")) {
            $j(element).parent().removeClass("fbPhotosPhotoLike").addClass("confirm-photo-like");
        }
    });
});

$j(document).scroll(function() {
    if (state == 'on') {
        $j("._5glz._53b").each(function(index) {
            var element = $j(this)[0];
            if ($j(element).index() == 0 && $j(element).is(":visible")) {
                $j(element).addClass("confirm-_53b").removeClass("_53b");
            }
        });

        $j(".like").each(function(index) {
            var element = $j(this)[0];
            if ($j(element).index() == 0 && $j(element).is(":visible")) {
                $j(element).addClass("confirm-like").removeClass("like");
            }
            if ($j(element).parent().hasClass("fbPhotosPhotoLike") && !($j(element).parent()).hasClass("viewerLikesThis")) {
                $j(element).parent().removeClass("fbPhotosPhotoLike").addClass("confirm-photo-like");
            }
        });
    }
});

$j(document.body).on("click", selectors, function(e) {
    if (state == 'on') {
        $j(".like").each(function(index) {
            var element = $j(this)[0];
            if ($j(element).index() == 0 && $j(element).is(":visible")) {
                $j(element).addClass("confirm-like").removeClass("like");
            }
            if ($j(element).parent().hasClass("fbPhotosPhotoLike") && !($j(element).parent()).hasClass("viewerLikesThis")) {
                $j(element).parent().removeClass("fbPhotosPhotoLike").addClass("confirm-photo-like");
            }
        });
    } else {
        var element = $j(this)[0];
        if ($j(element).index() == 0 && $j(element).is(":visible")) {
            $j(element).addClass("confirm-like").removeClass("like");
        }
        if ($j(element).parent().hasClass("fbPhotosPhotoLike") && !($j(element).parent()).hasClass("viewerLikesThis")) {
            $j(element).parent().removeClass("fbPhotosPhotoLike").addClass("confirm-photo-like");
        }
    }
});

$j(document.body).on("click", ".confirm-_53b", function(e) {
    if (state == 'on') {
        var self = $j(this);
        if (window.confirm("Are you sure you want to like this?")) {
            self.removeClass("confirm-_53b").addClass("_53b");
            self[0].click();
        }
    } else {
        var self = $j(this);
        self.removeClass("confirm-_53b").addClass("_53b");
        self[0].click();
    }
});

$j(document.body).on("click", ".confirm-like", function(e) {
    e.preventDefault();
    if (state == 'on') {
        var self = $j(this);
        if (window.confirm("Are you sure you want to like this?")) {
            self.removeClass("confirm-like").addClass("like");
            if ($j(self.parent()[0]).hasClass("confirm-photo-like")) {
                self.parent().removeClass("confirm-photo-like").addClass("fbPhotosPhotoLike");
            }
            bind = false;
            self[0].click();
            setTimeout(function() {
                bind = true;
            }, 100);
        }
    } else {
        var self = $j(this);
        self.removeClass("confirm-like").addClass("like");
        if ($j(self.parent()[0]).hasClass("confirm-photo-like")) {
            self.parent().removeClass("confirm-photo-like").addClass("fbPhotosPhotoLike");
        }
        bind = false;
        self[0].click();
        setTimeout(function() {
            bind = true;
        }, 100);
    }
});

$j(document.body).on("click", selectors, function(e) {
    if (state == 'on') {
        jQuery.ready();
        if (typeof $j(this).attr("title") === "undefined") {
            if (window.confirm("Are you sure you want to like this?")) {
                return true;
            } else {
                return false;
            }
        } else if ($j(this).attr("title").toLowerCase() == "like this" && bind) {
            if (window.confirm("Are you sure you want to like this?")) {
                return true;
            } else {
                return false;
            }
        } else if ($j(this).attr("title").toLowerCase() == "unlike this" && bind) {
            return true;
        } else if (bind) {
            if (window.confirm("Are you sure you want to like this?")) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
});

function setState() {
    chrome.storage.sync.get("state", function(obj) {
        state = obj.state;
    });
}