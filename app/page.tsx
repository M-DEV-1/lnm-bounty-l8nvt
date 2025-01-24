'use client';
      import React from 'react';
      import { useState, useEffect } from 'react';
      import * as fcl from '@onflow/fcl';

      fcl.config({
        'app.detail.title': 'Flow Bounty Platform',
        'app.detail.icon': 'https://placekitten.com/g/200/200',
        'accessNode.api': 'https://rest-testnet.onflow.org',
        'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
      });

      export default function Home() {
        const [user, setUser] = useState({ loggedIn: false });
        const [bounties, setBounties] = useState([]);

        useEffect(() => {
          fcl.currentUser.subscribe(setUser);
        }, []);

        const createBounty = async () => {
          const transactionId = await fcl.mutate({
            cadence: `
              import BountyContract from 0x9d2ade18cb6bea1a
              
              transaction(amount: UFix64, deadline: UFix64) {
                prepare(signer: AuthAccount) {
                  BountyContract.createBounty(amount: amount, deadline: deadline)
                }
              }
            `,
            args: (arg, t) => [
              arg(3000.0, t.UFix64),
              arg(Date.now() / 1000 + 86400, t.UFix64), // 24 hours from now
            ],
            payer: fcl.authz,
            proposer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 999,
          });
          
          console.log('Transaction Id', transactionId);
        };

        return (
          <div className='min-h-screen bg-gray-100 p-8'>
            <div className='max-w-4xl mx-auto'>
              <h1 className='text-4xl font-bold mb-8'>Flow Bounty Platform</h1>
              
              {user.loggedIn ? (
                <div>
                  <button
                    onClick={() => fcl.unauthenticate()}
                    className='bg-red-500 text-white px-4 py-2 rounded'
                  >
                    Log Out
                  </button>
                  <button
                    onClick={createBounty}
                    className='bg-blue-500 text-white px-4 py-2 rounded ml-4'
                  >
                    Create Bounty
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fcl.authenticate()}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        );
      }