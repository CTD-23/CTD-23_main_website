const get=(req,res)=>{

    res.status(200).json({message:"get"});

};

const post=(req,res)=>{

    res.status(201).json({message:"post "});

};
const put=(req,res)=>{

    res.status(200).json({message:"update"});

};
const del=(req,res)=>{

    res.status(200).json({message:"to delete"});

};

module.exports={get,post,put,del};