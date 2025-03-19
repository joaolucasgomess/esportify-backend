import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { IAdminRepository } from "../repositories/interfaces/admin.respository.interface";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

declare global {
    namespace Express {
        interface Request {
            authenticatedUser: AuthenticatedUser;
        }
    }
}

export class AuthMiddleware {
    private userRepository: IUserRepository;
    private adminRepository: IAdminRepository;
    private test: string;

    constructor(userRepository: IUserRepository, adminRepository: IAdminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.test = "pintuc";
    }

    authenticate = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).send({ message: "Token required." });
            return;
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_KEY as string,
            ) as AuthenticationData;

            const user = await this.userRepository.selectUserById(decoded.userId);

            if (!user) {
                res.status(404).send({ message: "User not found." });
                return;
            }

            req.authenticatedUser = {
                userId: user.id,
                role: user.role,
            };

            next();
        } catch (err: any) {
            if (err.message.includes("jwt expired")) {
                res.status(401).send({ message: "Token expired." });
                return;
            }

            res.status(401).send({ message: "Invalid token." });
        }
    };

    authorize = (roles: string[]) => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const user = req.authenticatedUser;

            if (!user) {
                res.status(401).send({ message: "Authentication required" });
                return;
            }

            try {
                if (!roles.includes(user.role)) {
                    res.status(403).send({
                        message: "Access denied to this resource",
                    });
                    return;
                }

                if (user.role === "admin") {
                    const admin = await this.adminRepository.selectAdminById(user.userId);

                    if (!admin) {
                        res.status(403).send({
                            message: "Access denied to this resource",
                        });
                        return;
                    }

                    req.authenticatedUser.sportsComplexId = admin.sportsComplexId;
                }

                next();
            } catch (err: any) {
                res.status(500).send({ message: err.message });
            }
        };
    };
}

export interface AuthenticationData {
    userId: string;
}

interface AuthenticatedUser {
    userId: string;
    role: string;
    sportsComplexId?: string;
}
