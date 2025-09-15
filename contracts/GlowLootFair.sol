// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract GlowLootFair is SepoliaConfig {
    using FHE for *;
    
    struct LootBox {
        euint32 boxId;
        euint32 itemCount;
        euint32 raritySeed;
        bool isOpened;
        bool isActive;
        address owner;
        uint256 createdAt;
        uint256 openedAt;
    }
    
    struct LootItem {
        euint32 itemId;
        euint32 rarity;
        euint32 value;
        string name;
        string description;
        string imageUri;
    }
    
    struct PlayerStats {
        euint32 boxesOpened;
        euint32 totalItems;
        euint32 rareItems;
        euint32 epicItems;
        euint32 legendaryItems;
        euint32 totalValue;
    }
    
    mapping(uint256 => LootBox) public lootBoxes;
    mapping(uint256 => LootItem) public lootItems;
    mapping(address => PlayerStats) public playerStats;
    mapping(address => uint256[]) public playerBoxes;
    
    uint256 public boxCounter;
    uint256 public itemCounter;
    
    address public owner;
    address public verifier;
    
    // Rarity definitions
    uint32 constant COMMON_RARITY = 1;
    uint32 constant RARE_RARITY = 2;
    uint32 constant EPIC_RARITY = 3;
    uint32 constant LEGENDARY_RARITY = 4;
    
    // Rarity probabilities (out of 1000)
    uint32 constant COMMON_PROBABILITY = 600;
    uint32 constant RARE_PROBABILITY = 250;
    uint32 constant EPIC_PROBABILITY = 120;
    uint32 constant LEGENDARY_PROBABILITY = 30;
    
    event LootBoxCreated(uint256 indexed boxId, address indexed owner);
    event LootBoxOpened(uint256 indexed boxId, address indexed owner, uint32 itemCount);
    event LootItemRevealed(uint256 indexed itemId, uint256 indexed boxId, address indexed owner, uint32 rarity);
    event PlayerStatsUpdated(address indexed player, uint32 boxesOpened, uint32 totalItems);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createLootBox(
        externalEuint32 itemCount,
        externalEuint32 raritySeed,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(msg.value >= 0.01 ether, "Insufficient payment for lootbox");
        
        uint256 boxId = boxCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalItemCount = FHE.fromExternal(itemCount, inputProof);
        euint32 internalRaritySeed = FHE.fromExternal(raritySeed, inputProof);
        
        lootBoxes[boxId] = LootBox({
            boxId: FHE.asEuint32(0), // Will be set properly later
            itemCount: internalItemCount,
            raritySeed: internalRaritySeed,
            isOpened: false,
            isActive: true,
            owner: msg.sender,
            createdAt: block.timestamp,
            openedAt: 0
        });
        
        playerBoxes[msg.sender].push(boxId);
        
        emit LootBoxCreated(boxId, msg.sender);
        return boxId;
    }
    
    function openLootBox(
        uint256 boxId,
        externalEuint32 randomSeed,
        bytes calldata inputProof
    ) public returns (uint256[] memory) {
        require(lootBoxes[boxId].owner == msg.sender, "Not the owner of this lootbox");
        require(lootBoxes[boxId].isActive, "Lootbox is not active");
        require(!lootBoxes[boxId].isOpened, "Lootbox already opened");
        
        // Convert external encrypted random seed to internal
        euint32 internalRandomSeed = FHE.fromExternal(randomSeed, inputProof);
        
        // Mark box as opened
        lootBoxes[boxId].isOpened = true;
        lootBoxes[boxId].openedAt = block.timestamp;
        
        // Generate items based on encrypted parameters
        uint256[] memory itemIds = generateLootItems(boxId, internalRandomSeed);
        
        // Update player stats
        updatePlayerStats(msg.sender, boxId);
        
        emit LootBoxOpened(boxId, msg.sender, 0); // Item count will be decrypted off-chain
        return itemIds;
    }
    
    function generateLootItems(
        uint256 boxId,
        euint32 randomSeed
    ) internal returns (uint256[] memory) {
        LootBox storage box = lootBoxes[boxId];
        
        // Get item count (this would be decrypted off-chain in real implementation)
        uint32 itemCount = 3; // Default to 3 items for demo
        
        uint256[] memory itemIds = new uint256[](itemCount);
        
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 itemId = itemCounter++;
            
            // Generate encrypted rarity based on probabilities
            euint32 rarity = generateRarity(randomSeed, i);
            
            // Generate encrypted value based on rarity
            euint32 value = generateValue(rarity);
            
            lootItems[itemId] = LootItem({
                itemId: FHE.asEuint32(0), // Will be set properly later
                rarity: rarity,
                value: value,
                name: string(abi.encodePacked("Loot Item #", Strings.toString(itemId))),
                description: "A mysterious item from the encrypted lootbox",
                imageUri: string(abi.encodePacked("https://api.glowlootfair.com/items/", Strings.toString(itemId)))
            });
            
            itemIds[i] = itemId;
            
            emit LootItemRevealed(itemId, boxId, box.owner, 0); // Rarity will be decrypted off-chain
        }
        
        return itemIds;
    }
    
    function generateRarity(
        euint32 randomSeed,
        uint256 index
    ) internal pure returns (euint32) {
        // This is a simplified rarity generation
        // In a real implementation, this would use more sophisticated FHE operations
        euint32 seed = FHE.add(randomSeed, FHE.asEuint32(uint32(index)));
        
        // Use modulo operation to determine rarity
        euint32 rarityRoll = FHE.rem(seed, FHE.asEuint32(1000));
        
        // Determine rarity based on probabilities
        ebool isLegendary = FHE.lt(rarityRoll, FHE.asEuint32(LEGENDARY_PROBABILITY));
        ebool isEpic = FHE.and(
            FHE.gte(rarityRoll, FHE.asEuint32(LEGENDARY_PROBABILITY)),
            FHE.lt(rarityRoll, FHE.asEuint32(LEGENDARY_PROBABILITY + EPIC_PROBABILITY))
        );
        ebool isRare = FHE.and(
            FHE.gte(rarityRoll, FHE.asEuint32(LEGENDARY_PROBABILITY + EPIC_PROBABILITY)),
            FHE.lt(rarityRoll, FHE.asEuint32(LEGENDARY_PROBABILITY + EPIC_PROBABILITY + RARE_PROBABILITY))
        );
        
        // Return rarity value based on conditions
        euint32 rarity = FHE.select(isLegendary, FHE.asEuint32(LEGENDARY_RARITY), FHE.asEuint32(COMMON_RARITY));
        rarity = FHE.select(isEpic, FHE.asEuint32(EPIC_RARITY), rarity);
        rarity = FHE.select(isRare, FHE.asEuint32(RARE_RARITY), rarity);
        
        return rarity;
    }
    
    function generateValue(
        euint32 rarity
    ) internal pure returns (euint32) {
        // Generate value based on rarity
        // Legendary items have highest value, common items have lowest
        euint32 baseValue = FHE.mul(rarity, FHE.asEuint32(100));
        euint32 randomMultiplier = FHE.add(FHE.asEuint32(50), FHE.rem(rarity, FHE.asEuint32(100)));
        
        return FHE.mul(baseValue, randomMultiplier);
    }
    
    function updatePlayerStats(
        address player,
        uint256 boxId
    ) internal {
        PlayerStats storage stats = playerStats[player];
        
        // Increment boxes opened
        stats.boxesOpened = FHE.add(stats.boxesOpened, FHE.asEuint32(1));
        
        // Get item count from box (would be decrypted off-chain)
        uint32 itemCount = 3; // Default for demo
        stats.totalItems = FHE.add(stats.totalItems, FHE.asEuint32(itemCount));
        
        emit PlayerStatsUpdated(player, 0, 0); // Values will be decrypted off-chain
    }
    
    function getLootBoxInfo(uint256 boxId) public view returns (
        bool isOpened,
        bool isActive,
        address owner,
        uint256 createdAt,
        uint256 openedAt
    ) {
        LootBox storage box = lootBoxes[boxId];
        return (
            box.isOpened,
            box.isActive,
            box.owner,
            box.createdAt,
            box.openedAt
        );
    }
    
    function getLootItemInfo(uint256 itemId) public view returns (
        string memory name,
        string memory description,
        string memory imageUri,
        uint8 rarity,
        uint8 value
    ) {
        LootItem storage item = lootItems[itemId];
        return (
            item.name,
            item.description,
            item.imageUri,
            0, // FHE.decrypt(item.rarity) - will be decrypted off-chain
            0  // FHE.decrypt(item.value) - will be decrypted off-chain
        );
    }
    
    function getPlayerStats(address player) public view returns (
        uint8 boxesOpened,
        uint8 totalItems,
        uint8 rareItems,
        uint8 epicItems,
        uint8 legendaryItems,
        uint8 totalValue
    ) {
        PlayerStats storage stats = playerStats[player];
        return (
            0, // FHE.decrypt(stats.boxesOpened) - will be decrypted off-chain
            0, // FHE.decrypt(stats.totalItems) - will be decrypted off-chain
            0, // FHE.decrypt(stats.rareItems) - will be decrypted off-chain
            0, // FHE.decrypt(stats.epicItems) - will be decrypted off-chain
            0, // FHE.decrypt(stats.legendaryItems) - will be decrypted off-chain
            0  // FHE.decrypt(stats.totalValue) - will be decrypted off-chain
        );
    }
    
    function getPlayerBoxes(address player) public view returns (uint256[] memory) {
        return playerBoxes[player];
    }
    
    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance > 0, "No funds to withdraw");
        
        payable(owner).transfer(address(this).balance);
    }
    
    function setVerifier(address _verifier) public {
        require(msg.sender == owner, "Only owner can set verifier");
        verifier = _verifier;
    }
    
    function deactivateLootBox(uint256 boxId) public {
        require(msg.sender == owner || msg.sender == verifier, "Not authorized");
        require(lootBoxes[boxId].owner != address(0), "Lootbox does not exist");
        
        lootBoxes[boxId].isActive = false;
    }
}
