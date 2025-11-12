"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^\+?[0-9]{8,15}$/, 'Invalid contact number format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    presentAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String,
    },
    dob: {
        type: String, // could also be Date if you want
    },
    profilePic: {
        type: String,
        default: '/assets/default-avatar.png',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// 🔐 Hash password before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
// 🔐 Remove password from returned doc
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// ✅ Static methods
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
userSchema.statics.isUserBlocked = function (userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email: userEmail, isBlocked: true });
    });
};
userSchema.statics.isUserExistByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ email }).select('+password');
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
