import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("LockModule", (m) => {
  const lock = m.contract("LiskChatStorage", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});
