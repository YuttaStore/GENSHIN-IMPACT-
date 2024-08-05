document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.querySelector('.order-info form');
    const totalPriceSpan = document.getElementById('total-price');
    const orderNowButton = document.querySelector('.order-now');
    const qrCodeUrl = "https://i.ibb.co/Sdn6bL7/yutta-qr-code.jpg"; // Replace with your QR code image URL

    let selectedPackage = null;

    // Event listener for form submission
    orderNowButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default button action

        const userId = document.getElementById('user-id').value;
        const zoneId = document.getElementById('zone-id').value;
        const totalPrice = totalPriceSpan.textContent;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        const paymentOption = paymentMethod ? paymentMethod.value : 'Not selected';
        const timestamp = new Date().toLocaleString();
        const productId = selectedPackage ? selectedPackage.querySelector('.details h3').textContent + "Crystals" : 'Not selected'; // Get the selected package ID

        // Construct the invoice message
        const invoiceMessage = `
                   
                   
                   
*INVOICE BILL from* yuttastore.com
                 
Time: ${timestamp} 
------------------------------------------------------
*User ID*: (${userId})
Zone ID: ${zoneId}
*Product : ${productId}*
*Mode of Payment* : ${paymentOption}
------------------------------------------------------
*Total: ${totalPrice}*
            
*Payment Method* 
           
1. UPI ID: (q731109764@ybl)
            
2. [QR Code](${qrCodeUrl})
            
Please make the payment to complete your order. Thank you!
        `;

        // Encode the message for WhatsApp
        const encodedMessage = encodeURIComponent(invoiceMessage);
        const whatsappUrl = `https://wa.me/8414075796?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
    });

    // Update total price and highlight selected package
    document.querySelectorAll('.package').forEach(packageElem => {
        packageElem.addEventListener('click', () => {
            const price = packageElem.dataset.price;
            totalPriceSpan.textContent = `Rs. ${price}`;
            document.querySelectorAll('.package').forEach(p => p.classList.remove('selected'));
            packageElem.classList.add('selected');
            selectedPackage = packageElem; // Store the selected package
        });
    });
});