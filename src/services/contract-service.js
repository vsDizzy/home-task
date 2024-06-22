const { Contract } = require('../model')
const { Op } = require('sequelize')

async function getContract(id, profileId) {
  return Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  })
}

module.exports = { getContract }
