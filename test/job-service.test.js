const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { getUnpaidJobs, payJob } = require('../src/services/job-service')
const { Job, Profile } = require('../src/model')

describe(getUnpaidJobs.name, () => {
  it('gets unpaid jobs', async () => {
    const jobs = await getUnpaidJobs(1)
    assert.equal(jobs.length, 1)

    assert.equal(jobs[0].id, 2)
  })
})

describe(payJob.name, () => {
  it('pays the job', async () => {
    const transaction = await Job.sequelize.transaction()
    try {
      await assert.doesNotReject(payJob(2, 1, transaction))

      const client = await Profile.findByPk(1, { transaction })
      assert.equal(client.balance, 949)

      const contractor = await Profile.findByPk(6, { transaction })
      assert.equal(contractor.balance, 1415)
    } finally {
      await transaction.rollback()
    }
  })

  it('handles already paid job', async () => {
    const t = await Job.sequelize.transaction()
    try {
      await assert.rejects(payJob(9, 1, t), Error('Job is already paid.'))
    } finally {
      await t.rollback()
    }
  })
})
