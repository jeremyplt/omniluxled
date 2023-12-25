$(document).ready(function () {
  $(document).on(
    'change',
    "input[name='radio-1'], input[name='radio-2'], input[data-type='datetime'], input[name='checkbox-1[]']",
    function () {
      let method = $("input[name='radio-1']:checked").val();
      let direct = $("input[name='radio-2']:checked").val();
      let date = $("input[data-type='datetime']").val();

      let orderDate = new Date(date);
      let warrantyDate = new Date();
      warrantyDate.setFullYear(warrantyDate.getFullYear() - 2);

      let products = Array.from($("input[name='checkbox-1[]']:checked"));
      let skincare = false;
      let device = false;

      if (method == 'Replacement') {
        $("input[value='LED Essentials Bundle']").parent().parent().hide();
        $("input[value='Enzyme Powder Cleanser']").parent().parent().hide();
        $("input[value='Hyaluronic Acid Serum']").parent().parent().hide();
        $("input[value='Peptide Concentrate']").parent().parent().hide();
        $("input[value='Omnilux Hydrogel Facial Mask']").parent().parent().hide();
        $("input[value='Omnilux Hydrogel Décolleté Mask']").parent().parent().hide();
        $("input[value='Mini Eye Brightener Refill']").parent().parent().hide();
        $("input[value='Mini Skin Corrector Refill']").parent().parent().hide();
        $("input[value='Mini Blemish Eraser Refill']").parent().parent().hide();
      } else {
        $("input[value='LED Essentials Bundle']").parent().parent().show();
        $("input[value='Enzyme Powder Cleanser']").parent().parent().show();
        $("input[value='Hyaluronic Acid Serum']").parent().parent().show();
        $("input[value='Peptide Concentrate']").parent().parent().show();
        $("input[value='Omnilux Hydrogel Facial Mask']").parent().parent().show();
        $("input[value='Omnilux Hydrogel Décolleté Mask']").parent().parent().show();
        $("input[value='Mini Eye Brightener Refill']").parent().parent().show();
        $("input[value='Mini Skin Corrector Refill']").parent().parent().show();
        $("input[value='Mini Blemish Eraser Refill']").parent().parent().show();
      }

      if (method == 'Return' && direct == 'No') {
        $('.alert.no-return').parent().show();
        $('.wizard__submit').prop('disabled', true);
      } else {
        $('.alert.no-return').parent().hide();
        $('.wizard__submit').prop('disabled', false);
      }

      if (method == 'Replacement' && direct == 'No') {
        $('.alert.verify-receipt').parent().show();
        $("input[placeholder='Business Name']").parent().parent().show();
        $("input[placeholder='Business Name']").prop('disabled', false);
        $("input[placeholder='Order Number']").parent().parent().hide();
        $("input[placeholder='Order Number']").prop('disabled', true);
        $("input[placeholder='Proof of Purchase']")
          .parent()
          .parent()
          .show();
          
      } else {
        $('.alert.verify-receipt').parent().hide();
        $("input[placeholder='Business Name']").parent().parent().hide();
        $("input[placeholder='Business Name']").prop('disabled', true);
        $("input[placeholder='Order Number']").parent().parent().show();
        $("input[placeholder='Order Number']").prop('disabled', false);
        $("input[placeholder='Proof of Purchase']")
          .parent()
          .parent()
          .hide();
      }

      if (method == 'Replacement' && orderDate < warrantyDate) {
        $('.alert.warranty').parent().show();
      } else {
        $('.alert.warranty').parent().hide();
      }

      products.forEach((product) => {        
        if (
          $(product).val() == 'Omnilux Contour Face' ||
          $(product).val() == 'Omnilux Men' ||
          $(product).val() == 'Omnilux Clear' ||
          $(product).val() == 'Omnilux Contour Neck & Décolleté' ||
          $(product).val() == 'Omnilux Contour Glove' ||
          $(product).val() == 'Mini Eye Brightener' ||
          $(product).val() == 'Mini Skin Corrector' ||
          $(product).val() == 'Mini Blemish Eraser'

        ) {
          device = true;
        }        

        if (
          $(product).val() == 'LED Essentials Bundle' ||
          $(product).val() == 'Enzyme Powder Cleanser' ||
          $(product).val() == 'Hyaluronic Acid Serum' ||
          $(product).val() == 'Peptide Concentrate' ||
          $(product).val() == 'Omnilux Hydrogel Facial Mask' ||
          $(product).val() == 'Omnilux Hydrogel Décolleté Mask' ||
          $(product).val() == 'Mini Eye Brightener Refill' ||
          $(product).val() == 'Mini Skin Corrector Refill' ||
          $(product).val() == 'Mini Blemish Eraser Refill'
        ) {
          skincare = true;
        }        
      });

      if(device == true) {
        $('.alert.sn').parent().show();
      } else {
        $('.alert.sn').parent().hide();
      }

      if (method == 'Return' && skincare == true) {
        $('.alert.topical').parent().show();
      } else {
        $('.alert.topical').parent().hide();
      }

      // Country Code
      let country_code = $('#country_code').val();

      if (country_code) {
        $('#hidden-1').val(country_code);
      }
    }
  );
});
