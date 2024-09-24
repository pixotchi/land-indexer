import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  // Define the Land table as the primary entity
  Land: p.createTable({
    id: p.bigint(),
    owner: p.string(),
    name: p.string().optional(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // Define the Plant table related to Land
  Plant: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    lifetime: p.bigint(),
    points: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // Event tables related to Land and Plant

  // PlantLifetimeAssigned event
  PlantLifetimeAssignedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    lifetime: p.bigint(),
    newLifetime: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // PlantPointsAssigned event
  PlantPointsAssignedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    addedPoints: p.bigint(),
    newPlantPoints: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // Transfer event (updates Land owner)
  LandTransferEvent: p.createTable({
    id: p.bigint(),
    from: p.string(),
    to: p.string(),
    tokenId: p.bigint().references("Land.id"),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // VillageProductionClaimed event
  VillageProductionClaimedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // VillageProductionXPClaimCooldownActive event
  VillageProductionXPClaimCooldownActiveEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.bigint(),
    currentTime: p.bigint(),
    cooldownEndTime: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // VillageProductionXPClaimed event
  VillageProductionXPClaimedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.bigint(),
    claimTime: p.bigint(),
    xpAwarded: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // VillageSpeedUpWithSeed event
  VillageSpeedUpWithSeedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    speedUpCost: p.bigint(),
    xp: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // VillageUpgradedWithLeaf event
  VillageUpgradedWithLeafEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    upgradeCost: p.bigint(),
    xp: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // TownSpeedUpWithSeed event
  TownSpeedUpWithSeedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    speedUpCost: p.bigint(),
    xp: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // TownUpgradedWithLeaf event
  TownUpgradedWithLeafEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    upgradeCost: p.bigint(),
    xp: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // Quest events related to Land

  // QuestStarted event
  QuestStartedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    difficulty: p.int(),
    startBlock: p.bigint(),
    endBlock: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // QuestCommitted event
  QuestCommittedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    pseudoRndBlock: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // QuestFinalized event
  QuestFinalizedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    player: p.string(),
    rewardType: p.int(),
    amount: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // QuestReset event
  QuestResetEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    player: p.string(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // XPAdded event (relates to Land)
  XPAddedEvent: p.createTable({
    id: p.string(),
    tokenId: p.bigint().references("Land.id"),
    amount: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // WareHouseLifetimeAssigned event
  WareHouseLifetimeAssignedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    lifetime: p.bigint(),
    newLifetime: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // WareHousePlantPointsAssigned event
  WareHousePlantPointsAssignedEvent: p.createTable({
    id: p.string(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    addedPoints: p.bigint(),
    newPlantPoints: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // LandNameChanged event (updates Land name)
  LandNameChangedEvent: p.createTable({
    id: p.bigint(),
    tokenId: p.bigint().references("Land.id"),
    name: p.string(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),

  // LandMinted event (creates new Land)
  LandMintedEvent: p.createTable({
    id: p.bigint(),
    to: p.string(),
    tokenId: p.bigint().references("Land.id"),
    mintPrice: p.bigint(),
    blockHeight: p.bigint(),
    timestamp: p.bigint(),
  }),
}));
