$("#pushable").modal({
    backdrop: "static",
    keyboard: false,
    show: false,
});

$("#pushable").on("shown.bs.modal", function() {
    var progress = setInterval(function() {
        var $bar = $(".bar");

        if ($bar.width() == 500) {
            // complete!

            // reset progree bar
            clearInterval(progress);
            $(".progress").removeClass("active");
            $bar.width(0);

            // update modal
            $("#pushable .modal-body").html(
                "Task complete. You can now close the modal."
            );
            $("#pushable .hide,#pushable .in").toggleClass("hide in");

            // re-enable modal allowing close
            $("#pushable").data("reenable", true);
            $("#pushable").modal("hide");
        } else {
            // perform processing logic (ajax) here
            $bar.width($bar.width() + 100);
        }

        $bar.text($bar.width() / 5 + "%");
    }, 600);
});

$("#pushable").on("hidden.bs.modal", function() {
    // reset modal
    if ($("#pushable").data("reenable")) {
        $(this).removeData();
        $("#pushable").modal({
            show: true,
        });
    }
});