(function ($, window) {
    "use strict";
    $(function () {
        var $portion1 = $("#portion-1"),
            $portion2 = $("#portion-2");

        $("input").on('change', function () {
            var p1 = parseInt($portion1.val(), 10) || 1,
                p2 = parseInt($portion2.val(), 10) || 1,
                portions = p1 * p2;

            $("input.amount-input").each(function () {
                var $this = $(this),
                    product = $this.data('product'),
                    amount = parseFloat($this.val()) || 1,
                    $totalAmountInput = $(".total-amount-input."+product),
                    $priceInput = $("input.price-input."+product);

                if (!$this.siblings('input[type="checkbox"]').is(':checked')) {
                    $totalAmountInput.parents('li').hide();
                    return;
                }
                var totalAmount = amount * portions,
                    multiplier = parseFloat($priceInput.data('multiplier')) || 1,
                   productPrice = totalAmount * parseFloat($priceInput.val()) * multiplier;
                $totalAmountInput.text(totalAmount).parents('li').show();
                $totalAmountInput.siblings('.total-price-input').text(productPrice);
            });
        });
    });
})(jQuery, window);