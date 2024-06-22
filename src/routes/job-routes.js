const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { getUnpaidJobs, payJob } = require('../services/job-service')

const router = express.Router()

router.get('/unpaid', getProfile, async (req, res) => {
  const jobs = await getUnpaidJobs(req.profile.id)

  res.json(jobs)
})

router.post('/:job_id/pay', getProfile, async (req, res) => {
  try {
    await payJob(req.params.job_id, req.profile.id)
    res.end()
  } catch (e) {
    res.status(400).end(e.message)
  }
})

module.exports = router
