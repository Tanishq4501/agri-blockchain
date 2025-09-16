/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

/**
 * SupplyChainContract implements a supply chain management system
 * for agricultural products using Hyperledger Fabric
 */
class SupplyChainContract extends Contract {

    /**
     * Register a new crop in the ledger
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @param {string} name - Name of the crop
     * @param {string} farmerID - ID of the farmer who produced the crop
     * @param {number} quantity - Quantity of the crop
     * @param {number} price - Price per unit of the crop
     * @returns {Promise<void>}
     */
    async RegisterCrop(ctx, cropID, name, farmerID, quantity, price) {
        // Check if crop already exists
        const existing = await ctx.stub.getState(cropID);
        if (existing && existing.length > 0) {
            throw new Error(`Crop with ID ${cropID} already exists`);
        }

        // Validate inputs
        if (!cropID || !name || !farmerID) {
            throw new Error('Crop ID, name, and farmer ID are required');
        }

        // Validate numeric values
        const qty = parseFloat(quantity);
        const prc = parseFloat(price);
        
        if (isNaN(qty) || qty <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        
        if (isNaN(prc) || prc < 0) {
            throw new Error('Price must be a non-negative number');
        }

        // Create crop object
        const crop = {
            cropID,
            name,
            farmerID,
            currentOwner: farmerID,  // Initially owned by the farmer
            quantity: qty,
            price: prc,
            status: 'HARVESTED',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            history: [],
            documents: []
        };

        // Store in ledger
        await ctx.stub.putState(cropID, Buffer.from(JSON.stringify(crop)));
        
        // Emit event
        ctx.stub.setEvent('CropRegistered', Buffer.from(JSON.stringify(crop)));
        
        console.info(`Crop ${cropID} registered successfully`);
    }

    /**
     * Update crop details
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @param {number} quantity - Updated quantity of the crop
     * @param {number} price - Updated price per unit of the crop
     * @returns {Promise<void>}
     */
    async UpdateCrop(ctx, cropID, quantity, price) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());
        
        // Validate numeric values
        const qty = parseFloat(quantity);
        const prc = parseFloat(price);
        
        if (isNaN(qty) || qty <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        
        if (isNaN(prc) || prc < 0) {
            throw new Error('Price must be a non-negative number');
        }

        // Update crop details
        crop.quantity = qty;
        crop.price = prc;
        crop.updatedAt = new Date().toISOString();

        // Store updated crop in ledger
        await ctx.stub.putState(cropID, Buffer.from(JSON.stringify(crop)));
        
        // Emit event
        ctx.stub.setEvent('CropUpdated', Buffer.from(JSON.stringify(crop)));
        
        console.info(`Crop ${cropID} updated successfully`);
    }

    /**
     * Transfer ownership of a crop
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @param {string} fromID - ID of the current owner
     * @param {string} toID - ID of the new owner
     * @returns {Promise<void>}
     */
    async TransferOwnership(ctx, cropID, fromID, toID) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());
        
        // Verify current owner
        if (crop.currentOwner !== fromID) {
            throw new Error(`User ${fromID} is not the current owner of crop ${cropID}`);
        }

        // Verify new owner exists
        const userBytes = await ctx.stub.getState(toID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User with ID ${toID} does not exist`);
        }

        const user = JSON.parse(userBytes.toString());
        
        // Validate role transition
        const validTransitions = {
            'Farmer': ['Distributor'],
            'Distributor': ['Retailer'],
            'Retailer': ['Consumer'],
            'Consumer': []
        };

        const currentOwnerRole = await this._getUserRole(ctx, fromID);
        const newOwnerRole = user.role;

        if (!validTransitions[currentOwnerRole] || !validTransitions[currentOwnerRole].includes(newOwnerRole)) {
            throw new Error(`Invalid ownership transfer from ${currentOwnerRole} to ${newOwnerRole}`);
        }

        // Record transaction in history
        const transaction = {
            transactionType: 'TransferOwnership',
            from: fromID,
            to: toID,
            timestamp: new Date().toISOString(),
            roleFrom: currentOwnerRole,
            roleTo: newOwnerRole
        };

        crop.history.push(transaction);
        
        // Update ownership
        crop.currentOwner = toID;
        crop.updatedAt = new Date().toISOString();
        
        // Update status based on new owner role
        if (newOwnerRole === 'Distributor') {
            crop.status = 'IN_TRANSIT';
        } else if (newOwnerRole === 'Retailer') {
            crop.status = 'IN_STORE';
        } else if (newOwnerRole === 'Consumer') {
            crop.status = 'SOLD';
        }

        // Store updated crop in ledger
        await ctx.stub.putState(cropID, Buffer.from(JSON.stringify(crop)));
        
        // Emit event
        ctx.stub.setEvent('OwnershipTransferred', Buffer.from(JSON.stringify({cropID, fromID, toID})));
        
        console.info(`Ownership of crop ${cropID} transferred from ${fromID} to ${toID}`);
    }

    /**
     * Record payment for a crop
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @param {string} buyerID - ID of the buyer
     * @param {number} amount - Payment amount
     * @returns {Promise<void>}
     */
    async MakePayment(ctx, cropID, buyerID, amount) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());
        
        // Verify buyer exists
        const userBytes = await ctx.stub.getState(buyerID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User with ID ${buyerID} does not exist`);
        }

        // Validate amount
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            throw new Error('Amount must be a positive number');
        }

        // Record payment in history
        const payment = {
            transactionType: 'Payment',
            buyer: buyerID,
            amount: amt,
            timestamp: new Date().toISOString()
        };

        crop.history.push(payment);
        crop.updatedAt = new Date().toISOString();

        // Store updated crop in ledger
        await ctx.stub.putState(cropID, Buffer.from(JSON.stringify(crop)));
        
        // Emit event
        ctx.stub.setEvent('PaymentMade', Buffer.from(JSON.stringify({cropID, buyerID, amount: amt})));
        
        console.info(`Payment of ${amt} recorded for crop ${cropID} by buyer ${buyerID}`);
    }

    /**
     * Get current state of a crop
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @returns {Promise<string>} - Crop details as JSON string
     */
    async GetCrop(ctx, cropID) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        return cropBytes.toString();
    }

    /**
     * Get complete transaction history of a crop
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @returns {Promise<string>} - Crop history as JSON string
     */
    async GetCropHistory(ctx, cropID) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());
        return JSON.stringify(crop.history);
    }

    /**
     * Register a new user
     * @param {Context} ctx - The transaction context
     * @param {string} userID - Unique identifier for the user
     * @param {string} role - Role of the user (Farmer/Distributor/Retailer/Consumer)
     * @param {string} name - Name of the user
     * @returns {Promise<void>}
     */
    async RegisterUser(ctx, userID, role, name) {
        // Check if user already exists
        const existing = await ctx.stub.getState(userID);
        if (existing && existing.length > 0) {
            throw new Error(`User with ID ${userID} already exists`);
        }

        // Validate role
        const validRoles = ['Farmer', 'Distributor', 'Retailer', 'Consumer'];
        if (!validRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}. Valid roles are: ${validRoles.join(', ')}`);
        }

        // Validate inputs
        if (!userID || !role || !name) {
            throw new Error('User ID, role, and name are required');
        }

        // Create user object
        const user = {
            userID,
            role,
            name,
            createdAt: new Date().toISOString()
        };

        // Store in ledger
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        
        // Emit event
        ctx.stub.setEvent('UserRegistered', Buffer.from(JSON.stringify(user)));
        
        console.info(`User ${userID} registered successfully as ${role}`);
    }

    /**
     * Check access for a user to perform an action on a crop
     * @param {Context} ctx - The transaction context
     * @param {string} userID - ID of the user
     * @param {string} cropID - ID of the crop
     * @param {string} action - Action to be performed
     * @returns {Promise<boolean>} - True if access is granted
     */
    async CheckAccess(ctx, userID, cropID, action) {
        // Retrieve user from ledger
        const userBytes = await ctx.stub.getState(userID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User with ID ${userID} does not exist`);
        }

        const user = JSON.parse(userBytes.toString());
        
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());

        // Define access rules
        const accessRules = {
            'RegisterCrop': ['Farmer'],
            'UpdateCrop': ['Farmer'],
            'TransferOwnership': ['Farmer', 'Distributor', 'Retailer'],
            'MakePayment': ['Distributor', 'Retailer', 'Consumer'],
            'GetCrop': ['Farmer', 'Distributor', 'Retailer', 'Consumer'],
            'GetCropHistory': ['Farmer', 'Distributor', 'Retailer', 'Consumer'],
            'AttachDoc': ['Farmer', 'Distributor', 'Retailer']
        };

        // Check if action exists in access rules
        if (!accessRules[action]) {
            throw new Error(`Unknown action: ${action}`);
        }

        // Check if user role has access to perform the action
        if (!accessRules[action].includes(user.role)) {
            throw new Error(`User ${userID} with role ${user.role} is not authorized to perform action ${action}`);
        }

        // For ownership-related actions, verify ownership
        if (['UpdateCrop', 'TransferOwnership'].includes(action)) {
            if (crop.currentOwner !== userID) {
                throw new Error(`User ${userID} is not the current owner of crop ${cropID}`);
            }
        }

        return true;
    }

    /**
     * Attach a document (certificate/invoice) to a crop
     * @param {Context} ctx - The transaction context
     * @param {string} cropID - Unique identifier for the crop
     * @param {string} docHash - IPFS hash of the document
     * @param {string} docType - Type of document (certificate/invoice)
     * @returns {Promise<void>}
     */
    async AttachDoc(ctx, cropID, docHash, docType) {
        // Retrieve crop from ledger
        const cropBytes = await ctx.stub.getState(cropID);
        if (!cropBytes || cropBytes.length === 0) {
            throw new Error(`Crop with ID ${cropID} does not exist`);
        }

        const crop = JSON.parse(cropBytes.toString());
        
        // Validate inputs
        if (!docHash || !docType) {
            throw new Error('Document hash and type are required');
        }

        // Validate document type
        const validDocTypes = ['certificate', 'invoice'];
        if (!validDocTypes.includes(docType.toLowerCase())) {
            throw new Error(`Invalid document type: ${docType}. Valid types are: ${validDocTypes.join(', ')}`);
        }

        // Create document object
        const document = {
            docHash,
            docType: docType.toLowerCase(),
            attachedAt: new Date().toISOString()
        };

        // Add document to crop
        crop.documents.push(document);
        crop.updatedAt = new Date().toISOString();

        // Store updated crop in ledger
        await ctx.stub.putState(cropID, Buffer.from(JSON.stringify(crop)));
        
        // Emit event
        ctx.stub.setEvent('DocumentAttached', Buffer.from(JSON.stringify({cropID, docHash, docType})));
        
        console.info(`Document ${docHash} of type ${docType} attached to crop ${cropID}`);
    }

    /**
     * Helper function to get user role
     * @param {Context} ctx - The transaction context
     * @param {string} userID - ID of the user
     * @returns {Promise<string>} - Role of the user
     */
    async _getUserRole(ctx, userID) {
        const userBytes = await ctx.stub.getState(userID);
        if (!userBytes || userBytes.length === 0) {
            throw new Error(`User with ID ${userID} does not exist`);
        }

        const user = JSON.parse(userBytes.toString());
        return user.role;
    }
}

module.exports = SupplyChainContract;
