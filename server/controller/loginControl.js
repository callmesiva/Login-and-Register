const db = require("../database");
const bcrypt = require("bcryptjs");
const  Jwt = require("jsonwebtoken");


exports.homepage =(req,res)=>{
    res.render("homepage");
}
exports.profilepage =(req,res)=>{
    const{name,email,password,confirmpassword}= req.body
    let value=name;
    res.render("profilepage",{value});
}
exports.logintmp =(req,res)=>{
    res.render("loginpage");
}

exports.registerpage =(req,res)=>{
    res.render("registerpage");
}

exports.register =(req,res)=>{
    const{name,email,password,confirmpassword}= req.body
    console.log(name,email,password,confirmpassword);
    
    db.query("select email from logindata where email=?",[email], async (err,result)=>{
        if(!err){
            if(result.length > 0){
                res.render("registerpage",{msg:"You already have an account!"});
            }
            else{
                if(name==""||email==""|| password==""|| confirmpassword==""){
                    res.render("registerpage",{msg:"Please Enter All fields"});
                }
                else if(password!==confirmpassword){
                   res.render("registerpage",{msg:"Password Doesn't Match"});
                }
                else{
                    const passwordHashed = await bcrypt.hash(password,10);
                    db.query("insert into logindata(name,email,password) values(?,?,?)",[name,email,passwordHashed],(err,resolve)=>{
                        res.render("homepage",{name});
                    })
                } 
            }
        }
    })
}


exports.login =(req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        res.render("loginpage",{msg:"Please Enter All feilds"})
    }
    else{
        db.query("select * from logindata where email=?",[email],async(err,result)=>{
            if(!err){
               if(result<=0){
                res.render("loginpage",{msg:"You dont have any account please register below!"})
               }
               else{
                     if(!(await bcrypt.compare(password, result[0].password))){
                        res.render("loginpage",{msg:"Please enter your correct password"});
                    }
                    else{
                        const id = result[0].id;
                        let key=1234;
                        const token = Jwt.sign({id:id},"1234",{
                            expiresIn: '7d',
                        });
                        
                        const cookieoption = {
                            expires: new Date(
                                Date.now() + 7 *24*60*60*1000
                            ),
                            httpOnly:true,
                        };
                        res.cookie("loginpagecookie",token,cookieoption);
                        res.redirect("home");
                    }
               }
            } 
        })
    }

}