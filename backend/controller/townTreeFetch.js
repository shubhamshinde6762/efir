const TownTree = require("../model/TownTree");

exports.fetchTownTree = async (req, res) => {
    try{

        const data2 = await TownTree.create({TownTree:"hi"});
        const data = await TownTree.findOne({_id : "65e14e0dc235492e177abc43"});
        console.log(data2)

        if (data) 
        {
            res.status(200).json({
                data
            })
            return
        }

        res.status(400).json({
            message : "TownTree Not Fetched"
        })

    }
    catch(err)
    {
        res.status(500).json({
            message : err.message || "BAD-REQUEST"
        })
    }
}