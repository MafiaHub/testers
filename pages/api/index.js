const config = require('../../config.json')
import {loadCache, bustCache} from 'utils/cache'

export default async (req, res) => {
    const {projects} = config

    console.log(process.env)

    if (req.query.cache == 'bust') {
        return bustCache(req, res)
    }

    const data = await Promise.all(projects.map(async project => {
        return {
            name: project.alias,
            releases: await loadCache(project.owner, project.repository, project.alias)
        }
    }))

    res.json((data || []).filter(p => p.releases.length > 0))
}
