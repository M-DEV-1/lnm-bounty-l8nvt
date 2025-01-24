access(all) contract BountyContract {
          access(all) event BountyCreated(id: UInt64, amount: UFix64, creator: Address)
          access(all) event BountyClaimed(id: UInt64, claimer: Address)
          
          access(all) struct Bounty {
              access(all) let id: UInt64
              access(all) let amount: UFix64
              access(all) let creator: Address
              access(all) let deadline: UFix64
              access(all) var claimed: Bool
              
              init(id: UInt64, amount: UFix64, creator: Address, deadline: UFix64) {
                  self.id = id
                  self.amount = amount
                  self.creator = creator
                  self.deadline = deadline
                  self.claimed = false
              }
          }
          
          access(all) let bounties: {UInt64: Bounty}
          access(all) var nextBountyId: UInt64
          
          init() {
              self.bounties = {}
              self.nextBountyId = 1
          }
          
          access(all) fun createBounty(amount: UFix64, deadline: UFix64) {
              let bounty = Bounty(
                  id: self.nextBountyId,
                  amount: amount,
                  creator: self.account.address,
                  deadline: deadline
              )
              
              self.bounties[self.nextBountyId] = bounty
              emit BountyCreated(id: self.nextBountyId, amount: amount, creator: self.account.address)
              self.nextBountyId = self.nextBountyId + 1
          }
          
          access(all) fun claimBounty(id: UInt64) {
              pre {
                  self.bounties[id] != nil: "Bounty does not exist"
                  !self.bounties[id]!.claimed: "Bounty already claimed"
                  getCurrentBlock().timestamp <= self.bounties[id]!.deadline: "Bounty expired"
              }
              
              self.bounties[id]!.claimed = true
              emit BountyClaimed(id: id, claimer: self.account.address)
          }
      }