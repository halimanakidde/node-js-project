document.getElementById("woodForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get form values
      let woodType = document.getElementById("woodType").value.trim();
      let quantity = document.getElementById("quantity").value.trim();
      let supplier = document.getElementById("supplier").value.trim();
      let contact = document.getElementById("contact").value.trim();
      let price = document.getElementById("price").value.trim();
      let location = document.getElementById("location").value.trim();

      // Clear all previous errors
      document.querySelectorAll(".error").forEach(e => e.textContent = "");

      // Regex patterns
      let contactPattern = /^[0-9]{10}$/; // 10-digit phone number

      let valid = true;

      // Validation checks
      if (!woodType) {
        document.getElementById("woodTypeError").textContent = "Please select a wood type.";
        valid = false;
      }

      if (!quantity || quantity <= 0) {
        document.getElementById("quantityError").textContent = "Enter a valid quantity.";
        valid = false;
      }

      if (!supplier) {
        document.getElementById("supplierError").textContent = "Supplier name is required.";
        valid = false;
      }

      if (!contact) {
        document.getElementById("contactError").textContent = "Supplier contact is required.";
        valid = false;
      } else if (!contactPattern.test(contact)) {
        document.getElementById("contactError").textContent = "Enter a valid 10-digit phone number.";
        valid = false;
      }

      if (!price || price <= 0) {
        document.getElementById("priceError").textContent = "Enter a valid price per piece.";
        valid = false;
      }

      if (!location) {
        document.getElementById("locationError").textContent = "Storage location is required.";
        valid = false;
      }

      // Success
      if (valid) {
        alert("✅ Wood stock registered successfully!");
        this.reset();
      }
    });