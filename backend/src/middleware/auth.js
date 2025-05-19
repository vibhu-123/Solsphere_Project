export default (req,res,next)=>{
  const key = req.header("Authorization")?.split(" ")[1];
  if(key!==process.env.API_KEY) return res.status(401).json({error:"Unauthorized"});
  next();
};
