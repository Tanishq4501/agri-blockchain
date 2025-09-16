# Agri Supply Chain Chaincode

This is the Hyperledger Fabric chaincode for the agricultural supply chain management system.

## Functions Implemented

1. **RegisterCrop(cropID, name, farmerID, quantity, price)** - Add a new crop with farmer details
2. **UpdateCrop(cropID, quantity, price)** - Update crop details
3. **TransferOwnership(cropID, fromID, toID)** - Transfer ownership (Farmer → Distributor → Retailer)
4. **MakePayment(cropID, buyerID, amount)** - Record payment and link to ownership
5. **GetCrop(cropID)** - Fetch current state of a crop
6. **GetCropHistory(cropID)** - Get complete transaction history of a crop
7. **RegisterUser(userID, role, name)** - Add users with roles (Farmer/Distributor/Retailer/Consumer)
8. **CheckAccess(userID, cropID, action)** - Verify role-based access control
9. **AttachDoc(cropID, docHash, docType)** - Attach IPFS hash of certificate/invoice to a crop

## Installation

```bash
npm install
```

## Deployment

This chaincode can be deployed to a Hyperledger Fabric network using the standard deployment procedures.

## Data Model

### Crop

- `cropID`: Unique identifier
- `name`: Name of the crop
- `farmerID`: ID of the farmer
- `currentOwner`: Current owner ID
- `quantity`: Quantity available
- `price`: Price per unit
- `status`: Current status (HARVESTED, IN_TRANSIT, IN_STORE, SOLD)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `history`: Transaction history
- `documents`: Attached documents

### User

- `userID`: Unique identifier
- `role`: Role (Farmer, Distributor, Retailer, Consumer)
- `name`: User's name
- `createdAt`: Registration timestamp

### Document

- `docHash`: IPFS hash of the document
- `docType`: Type of document (certificate, invoice)
- `attachedAt`: Attachment timestamp
