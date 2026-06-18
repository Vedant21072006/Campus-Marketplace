import Listing from '../models/Listing.js'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'
export const createConversation=async(req,resp)=>{
   try{
      const {listingId} = req.body;
      const listing = await Listing.findById(listingId)
      if(!listing){
        return resp.status(404).json({
            message:'Listing not found',
            success:false
        })
      }
      let sellerId = listing.seller
      let buyerId  = req.user.id
      if(sellerId.toString()  === buyerId){
        return resp.status(400).json({
            message:'Cant have conversation with itself'
        })
      }
      const existingConversation = await Conversation.findOne({
         listing: listingId,
    buyer: buyerId,
    seller: sellerId,
      })
      if(existingConversation){
        return resp.status(200).json({
            message:'Conversation already exists',
            success:true,
            conversation:existingConversation
        })
      }
      
      const conversation  = await Conversation.create({
        listing:listingId,
        seller:sellerId,
        buyer:buyerId
      })
      resp.status(201).json({
        message:'Conversation created',
        success:true,
        conversation
      })
   }
   catch(error){
    return resp.status(500).json({
        message:error.message,
        success:false
    })
   }
}

export const getConversation=async(req,resp)=>{
  try{
     const userId = req.user.id
     const conversation = await Conversation.find({
       $or:[
        {buyer:userId},
        {seller:userId}
       ]
     })
     return resp.status(200).json({
      success:true,
      conversation
     })
  }
  catch(error){
    return resp.status(500).json({
        message:error.message,
        success:false      
    })
  }
}

export const sendMessage=async(req,resp)=>{
 try{
      const {conversationId,text} = req.body;
      const conversation = await Conversation.find(conversationId);
      if(!conversation){
        return resp.status(404).json({
           success:false,
           message:'Conversation not found'
        })
      }
      const message = await Message.create({
        conversation:conversationId,
        sender:req.user.id,
        text
      })
      conversation.lastmessage=text;
      await conversation.save()


    return resp.status(201).json({
      success:true,
      message
    });

 }
 catch(error){
    return resp.status(500).json({
      message:error.message,
      success:true
        })
 }
}

export const getMessage=async(req,resp)=>{
  try{
     const {conversationId} = req.params;
    const messages = await Message.find({
      conversation: conversationId
    }).sort({
      createdAt: 1
    });
     return resp.status(200).json({
      success:true,
      messages
    });
  }
  catch(error){
     return resp.status(500).json({
        message:error.message,
        success:false
     })
  }
}