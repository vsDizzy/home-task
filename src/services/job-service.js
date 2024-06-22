const { Job, Contract, Profile } = require('../model')
const { Op } = require('sequelize')

async function getUnpaidJobs(profileId) {
  return Job.findAll({
    include: [
      {
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          status: 'in_progress',
        },
      },
    ],
    where: { paid: false },
  })
}

async function payJob(id, profileId, transaction) {
  const job = await Job.findOne({
    include: [
      {
        model: Contract,
        required: true,
        where: { ClientId: profileId },
        include: [
          {
            model: Profile,
            required: true,
            as: 'Contractor',
            foreignKey: 'ContractorId',
          },
          {
            model: Profile,
            required: true,
            as: 'Client',
            foreignKey: 'ClientId',
          },
        ],
      },
    ],
    where: {
      id,
    },
    transaction,
  })

  if (!job) {
    throw new Error('Job is not found.')
  }

  if (job.paid) {
    throw new Error('Job is already paid.')
  }

  const { Contractor: contractor, Client: client } = job.Contract
  await Job.sequelize.transaction({ transaction }, async (transaction) => {
    await Promise.all([
      client.decrement({ balance: job.price }, { transaction }),
      contractor.increment({ balance: job.price }, { transaction }),
    ])

    await client.reload({ transaction })
    if (client.balance < 0) {
      throw new Error('Insufficient funds.')
    }

    job.paid = true
    await job.save({ transaction })
  })
}

module.exports = { getUnpaidJobs, payJob }
