(function ($, window) {
    "use strict";
    $(function () {
        var $portion1 = $("#portion-1"),
            $portion2 = $("#portion-2"),
            $totalPrice = $("#total-price-input");

        function recalculate() {
            var p1 = parseInt($portion1.val(), 10) || 1,
                p2 = parseInt($portion2.val(), 10) || 1,
                portions = p1 * p2,
                totalPrice = 0;
            $("input.amount-input").each(function () {
                var $this = $(this),
                    product = $this.data('product'),
                    amount = parseFloat($this.val().replace(',', '.')) || 1,
                    $totalAmountInput = $(".total-amount-input." + product),
                    $packagesAmountInput = $(".packages-amount-input."+product),
                    $priceInput = $("input.price-input." + product),
                    $totalPriceInput = $('.total-price-input.'+product),
                    inPack = parseInt($priceInput.data('inpack'), 10);


                if (!$this.siblings('input[type="checkbox"]').is(':checked')) {
                    $totalAmountInput.parents('li').hide();
                    return;
                }
                var totalAmount = amount * portions,
                    multiplier = parseFloat($priceInput.data('multiplier')) || 1,
                    price = parseFloat($priceInput.val().replace(',', '.')) * multiplier,
                    productPrice = totalAmount * price;
                if (inPack){
                    var packagesAmount = Math.ceil(totalAmount / inPack);
                    productPrice = packagesAmount *  price;
                    $packagesAmountInput.text(packagesAmount)
                }

                $totalAmountInput.text(totalAmount.toFixed(2)).parents('li').show();
                $totalPriceInput.text(productPrice.toFixed(2));
                totalPrice +=  productPrice;
            });
            $totalPrice.text(totalPrice.toFixed(2));
        }

        $("input").on('change', recalculate);
        recalculate();
    });
})(jQuery, window);