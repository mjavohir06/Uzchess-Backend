import { Body, Controller, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { ReportPublicService } from "../services/report/report.public.service";
import { ReportCreatePublicDto } from "../dtos/report/public/report.create.public.dto";
import type{ Request } from "express";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ReportCategoryListPublicDto } from "../dtos/report-category/public/report-category.list.public.dto";



@ApiTags("Public - Report")
@Controller("public/report")
export class ReportPublicController{
    constructor(private readonly reportSer:ReportPublicService){}

    @Post()
    async create(@Req() req:Request,@Body() payload:ReportCreatePublicDto){
        const user=req.user
        if(!user) throw new UnauthorizedException("User not found")
        return await this.reportSer.create(user.id,payload)
    }

    @Get()
    @ApiOkResponse({type:ReportCategoryListPublicDto,isArray:true})
    async getCategories(){
        return await this.reportSer.getAllCategory()
    }
}