import {User} from '../models/user.model.js'
import {Todo} from '../models/todo.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")   
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    const {username, password,} = req.body
    if([userName, password].some((field)=>field.trim() === "")){
        throw new ApiError(401, "All fields are required")
    }
    const existedUser = await User.findOne({
        username
    })
    if(existedUser){
        throw new ApiError(409, "User with same email or phone number already exists!")

    }
    const user = await User.create({
        username,
        password
    })

    const createuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(501, "Somthing went wrong while registring a user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser, "User register successful")
    )

})

const loginUser = asyncHandler(async(req,res)=>{
    const {username, password} = req.body
    if([username, password].some((field)=>field?.trim() === "")){
        throw new ApiError(401, "All fields are required")
    }
    const user = await User.findOne({
        username,
    })
    if(!user){
        throw new ApiError(404, "No user exits with this username")
    }
    const isPasswordValid = await user.isPasswordValid(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Password or email is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: isProduction,  
        sameSite: isProduction ? "lax" : "strict", 
        domain: isProduction ? ".satyamcodes.online" : undefined, 
    }
    res.status(200)
        .cookie("accessToken", accessToken, options) // Set accessToken
        .cookie("refreshToken", refreshToken, { ...options, httpOnly: true })
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully")
        )
})


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: isProduction,  
        sameSite: isProduction ? "lax" : "strict", 
        domain: isProduction ? ".satyamcodes.online" : undefined, 
    } 
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})


const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unathorized request");
    }


    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: isProduction,  
            sameSite: isProduction ? "lax" : "strict", 
            domain: isProduction ? ".satyamcodes.online" : undefined, 
        } 
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, newRefreshToken },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.messge || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await user.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })


    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully!"))

})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username } = req.body

    if (!username) {
        throw new ApiError(400, "Username is required")
    }

    User.findByIdAndUpdate(req.user?._id,
        {

            $set: {
                username: username
            }


        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, "User account details updated successfully")
    )

})



export {
    changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, getCurrentUser
}