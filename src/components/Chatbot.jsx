import { useEffect, useRef, useState } from "react"
import HTMLReactParser from "html-react-parser/lib/index"
import { GoogleGenerativeAI } from "@google/generative-ai"
import "../components/Style.css"
import { RESPONSE_FORMAT } from "./data/ResponseFormat"
import { AI_PROMPT } from "./data/Prompt"

// Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export const Chatbot = () => {
    // Message Data
    const [messageData, setMessageData] = useState([])

    const [isMessageOpen, setIsMessageOpen] = useState(false)
    const [isBotTyping, setIsBotTyping] = useState(false)

    // For the input field
    const [inputMessage, setInputMessage] = useState()

    // Add message function
    const addMessage = (newMessage) => {
        setMessageData(prevMessageData => [
            ...prevMessageData, 
            newMessage
        ])
    }

    // To send a new message
    const sendMessage = async (e) => {
        e.preventDefault()

        // Add new message to messageData
        const newMessage = { Account: "User", Message: inputMessage }
        addMessage(newMessage)

        // Clear the input field immediately after adding the message
        setInputMessage("")

        // Show bot typing indicator with a slight delay
        setTimeout(() => {
            setIsBotTyping(true)
        }, 500)

        // Generate response
        await getResponseForGivenPrompt()
    }

    // Scroll to the bottom when messageData updates
    const messageEndRef = useRef(null)
    useEffect(() => {   
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageData, isBotTyping])

    // Gemini AI Controller
    const getResponseForGivenPrompt= async () => {
        try{
            const model = genAI.getGenerativeModel({ model: "gemini-pro" })
            const result = await model.generateContent(RESPONSE_FORMAT(AI_PROMPT, inputMessage))
            const response = result.response
            const text = response.text()

            // Add new message to messageData
            const newMessage = { Account: "Chatbot", Message: text }
            addMessage(newMessage)

            setIsBotTyping(false) 
        }
        catch(error){
          console.log(`Something Went Wrong : ${error}`)
        }  
    }

  return (
    <div className="chatbotSection">
        {/* My Chatbot */}
        <div 
            alt="Chat bot"
            className="myChatbot"
            onClick={() => {setIsMessageOpen(!isMessageOpen)}}
        >
          {/* Inline SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            style={{ height: "2.5rem", width: "2.5rem", fill: "white", objectFit: "contain" }}
        >
            <path d="M22.5,9h-.5v-3.5c0-3.032-2.467-5.5-5.5-5.5H7.5C4.467,0,2,2.468,2,5.5v3.5h-.5c-.829,0-1.5.672-1.5,1.5s.671,1.5,1.5,1.5h.5v3.5c0,3.032,2.467,5.5,5.5,5.5h.093l2.866,2.413c.444.396,1.003.592,1.555.592.54,0,1.073-.187,1.486-.556l2.962-2.449h.038c3.033,0,5.5-2.468,5.5-5.5v-3.5h.5c.829,0,1.5-.672,1.5-1.5s-.671-1.5-1.5-1.5Zm-3.5,6.5c0,1.379-1.122,2.5-2.5,2.5h-.577c-.349,0-.687.122-.956.344l-2.963,2.45-2.898-2.441c-.271-.228-.613-.353-.966-.353h-.64c-1.378,0-2.5-1.121-2.5-2.5V5.5c0-1.379,1.122-2.5,2.5-2.5h9c1.378,0,2.5,1.121,2.5,2.5v10Z" />
            <path d="M16,6h-8c-1.105,0-2,.895-2,2v5c0,1.105.895,2,2,2h8c1.105,0,2-.895,2-2v-5c0-1.105-.895-2-2-2Zm-6.5,6c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm5,0c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Z" />
          </svg>
        </div>

        {/* Chat Section */
        isMessageOpen &&
        <>
        <div className="chatSection">
            {/* Header */}
            <div className="chatSectionHeader">
                
                <div></div>

                {/* Bot Name */}
                <p className="botName">EaseBot</p>
                    
                {/* Close */}
                <div 
                    className="closeButton"
                    onClick={() => {setIsMessageOpen(false)}}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                        style={{ fill: 'white', cursor: 'pointer' }}
                >
                        <path d="M19.293 4.707a1 1 0 0 0-1.414 0L12 11.586 6.121 5.707a1 1 0 0 0-1.414 1.414L10.586 13l-5.879 5.879a1 1 0 0 0 1.414 1.414L12 14.414l5.879 5.879a1 1 0 0 0 1.414-1.414L13.414 13l5.879-5.879a1 1 0 0 0 0-1.414z" />
                    </svg>
                </div>

            </div>


            {/* Body */}
            <div className="messageBody">
                {/* Chatbot */}
                <div className="conversationBotContainer">
                    {/* Chatbot avatar */}
                    <div className="botAvatar">EB</div>

                    {/* Message Content Static */}
                    <div className="botMessageContent">
                        <div className="staticMessageBot1">
                        Hi! 👋 This is <strong className="redText">EaseBot</strong>, your scholar buddy, here to help you with everything in <strong className="redText">ScholarEase</strong>.
                        </div>
                        <div className="staticMessageBot2">
                            So what brings you here today?
                        </div>
                    </div>
                </div>

                {/* Message Content Mapping */}
                <div style={{paddingBottom:"0"}}>
                    {messageData?.map((msg, index) => (
                        <div key={index} style={{marginTop:"0.75rem"}}>
                            {/* Conditional rendering based on Account */}
                            {msg.Account === "User" ? (
                                <div className="userMessage">
                                    {msg.Message}
                                </div>
                            ) : (
                                <div className="avatarMessage">
                                    {/* Chatbot avatar */}
                                    <div className="botAvatar">EB</div>

                                    {/* Message Content */}
                                    <div style={{maxWidth:"78%"}}>
                                        <div className="avatarChat">
                                            {HTMLReactParser(msg.Message)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                { // Chatbot replying animation
                isBotTyping &&
                    <div className="avatarMessage">
                        {/* Chatbot avatar */}
                        <div className="botAvatar">EB</div>
                        
                        <div className="staticMessageBot2">
                            EaseBot is typing...
                        </div>
                    </div>
                }

                {/* For scrolling to bottom whenever data change */}
                <div ref={messageEndRef}></div>
            </div>

            {/* Input Field */}
            <form className="px-5 py-3" style={{padding: "0.75rem 1.25rem"}} onSubmit={sendMessage}>
                <textarea 
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: '0.375rem', // Corresponds to rounded-md
                        border: '1px solid #C3C3C3', 
                        outline: '2px solid rgb(183, 42, 55)', // Custom outline color
                        padding: '0.5rem 0.75rem', // px-3 py-2
                        fontSize: '0.875rem', // text-sm
                        fontFamily: 'inherit',
                        resize: 'none',
                        height: "auto",
                        maxHeight: '7rem', // max-h-[7rem]
                        width: '100%', // w-full
                        marginTop: '0.5rem', // mt-2
                    }}
                    placeholder="Message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onInput={(e) => {
                        e.target.style.height = 'auto'; // Reset height
                        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scroll height
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // Prevent the default new line behavior
                            sendMessage(e); // Trigger the sendMessage function
                        }
                    }}
                />

                {/* Send Message */}
                <button
                    style={{
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgb(156, 28, 28)', // Replace with your custom color
                        padding: '1.25rem',
                        height: '3rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        fontFamily: 'inherit',
                        color: 'white',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '0.25rem',
                        marginBottom: '0.75rem',
                        opacity: (isBotTyping && inputMessage === "") || inputMessage?.length === 0 ? '0.7' : '1',
                        pointerEvents: (isBotTyping && inputMessage === "") || inputMessage?.length === 0 ? 'none' : 'auto',
                        transition: 'opacity 0.3s, transform 0.2s',
                        transform: 'scale(1)',
                    }}
                    type="submit"
                >
                    Send Message
                </button>
            </form>
        </div>
        </>
        }
    </div>
  )
}
