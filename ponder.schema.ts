import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  // Define the Land table as the primary entity
  Land: p.createTable({
    id: p.bigint(),
    owner: p.string(),
    name: p.string().optional(),
    // Additional fields can be added here
  }),

  // Define the Plant table related to Land
  Plant: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    lifetime: p.bigint(),
    points: p.bigint(),
    // Additional fields can be added here
  }),

  // Event tables related to Land and Plant

  // PlantLifetimeAssigned event
  PlantLifetimeAssignedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    lifetime: p.bigint(),
    newLifetime: p.bigint(),
  }),

  // PlantPointsAssigned event
  PlantPointsAssignedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    addedPoints: p.bigint(),
    newPlantPoints: p.bigint(),
  }),

  // Transfer event (updates Land owner)
  LandTransferEvent: p.createTable({
    id: p.bigint(),
    from: p.string(),
    to: p.string(),
    tokenId: p.bigint().references("Land.id"),
  }),

  // VillageProductionClaimed event
  VillageProductionClaimedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
  }),

  // VillageProductionXPClaimCooldownActive event
  VillageProductionXPClaimCooldownActiveEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.bigint(),
    currentTime: p.bigint(),
    cooldownEndTime: p.bigint(),
  }),

  // VillageProductionXPClaimed event
  VillageProductionXPClaimedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.bigint(),
    claimTime: p.bigint(),
    xpAwarded: p.bigint(),
  }),

  // VillageSpeedUpWithSeed event
  VillageSpeedUpWithSeedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    speedUpCost: p.bigint(),
    xp: p.bigint(),
  }),

  // VillageUpgradedWithLeaf event
  VillageUpgradedWithLeafEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    upgradeCost: p.bigint(),
    xp: p.bigint(),
  }),

  // TownSpeedUpWithSeed event
  TownSpeedUpWithSeedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    speedUpCost: p.bigint(),
    xp: p.bigint(),
  }),

  // TownUpgradedWithLeaf event
  TownUpgradedWithLeafEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    buildingId: p.int(),
    upgradeCost: p.bigint(),
    xp: p.bigint(),
  }),

  // Quest events related to Land

  // QuestStarted event
  QuestStartedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    difficulty: p.int(),
    startBlock: p.bigint(),
    endBlock: p.bigint(),
  }),

  // QuestCommitted event
  QuestCommittedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    pseudoRndBlock: p.bigint(),
  }),

  // QuestFinalized event
  QuestFinalizedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    player: p.string(),
    rewardType: p.int(),
    amount: p.bigint(),
  }),

  // QuestReset event
  QuestResetEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    farmerSlotId: p.bigint(),
    player: p.string(),
  }),

  // XPAdded event (relates to Land)
  XPAddedEvent: p.createTable({
    id: p.bigint(),
    tokenId: p.bigint().references("Land.id"),
    amount: p.bigint(),
  }),

  // WareHouseLifetimeAssigned event
  WareHouseLifetimeAssignedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    lifetime: p.bigint(),
    newLifetime: p.bigint(),
  }),

  // WareHousePlantPointsAssigned event
  WareHousePlantPointsAssignedEvent: p.createTable({
    id: p.bigint(),
    landId: p.bigint().references("Land.id"),
    plantId: p.bigint().references("Plant.id"),
    addedPoints: p.bigint(),
    newPlantPoints: p.bigint(),
  }),

  // LandNameChanged event (updates Land name)
  LandNameChangedEvent: p.createTable({
    id: p.bigint(),
    tokenId: p.bigint().references("Land.id"),
    name: p.string(),
  }),

  // LandMinted event (creates new Land)
  LandMintedEvent: p.createTable({
    id: p.bigint(),
    to: p.string(),
    tokenId: p.bigint().references("Land.id"),
    mintPrice: p.bigint(),
  }),
}));
