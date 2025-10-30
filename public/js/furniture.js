document.getElementById("furnitureForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get form values
      let itemName = document.getElementById("itemName").value.trim();
      let category = document.getElementById("category").value.trim();
      let material = document.getElementById("material").value.trim();
      let quantity = document.getElementById("quantity").value.trim();
      let price = document.getElementById("price").value.trim();
      let supplier = document.getElementById("supplier").value.trim();
      let contact = document.getElementById("contact").value.trim();
      let location = document.getElementById("location").value.trim();

      // Clear old errors
      document.querySelectorAll(".error").forEach(e => e.textContent = "");

      // Regex
      let contactPattern = /^[0-9]{10}$/;
      let valid = true;

      // Validation logic
      if (!itemName) {
        document.getElementById("itemNameError").textContent = "Furniture name is required.";
        valid = false;
      }

      if (!category) {
        document.getElementById("categoryError").textContent = "Select a category.";
        valid = false;
      }

      if (!material) {
        document.getElementById("materialError").textContent = "Select a wood/material type.";
        valid = false;
      }

      if (!quantity || quantity <= 0) {
        document.getElementById("quantityError").textContent = "Enter a valid quantity.";
        valid = false;
      }

      if (!price || price <= 0) {
        document.getElementById("priceError").textContent = "Enter a valid unit price.";
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
        document.getElementById("contactError").textContent = "Enter a valid 10-digit contact number.";
        valid = false;
      }

      if (!location) {
        document.getElementById("locationError").textContent = "Specify storage location.";
        valid = false;
      }

      // If everything is valid
      if (valid) {
        alert("✅ Furniture stock registered successfully!");
        this.reset();
      }
    });