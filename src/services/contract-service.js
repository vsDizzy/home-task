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

async function getAllContracts(profileId) {
  return Contract.findAll({
    where: {
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      status: {
        [Op.ne]: 'terminated',
      },
    },
  })
}

module.exports = { getContract, getAllContracts }
