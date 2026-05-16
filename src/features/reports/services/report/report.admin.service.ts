import { Injectable } from "@nestjs/common";
import { ReportAdminRepository } from "../../repository/report/report.admin.repository";
import { ReportCategoryCreateAdminDto } from "../../dtos/report-category/admin/report-category.create.admin.dto";
import { PaginationFilters } from "@/features/common/filters/pagination.filters";
import { plainToInstance } from "class-transformer";
import { ReportListAdminDto } from "../../dtos/report/admin/report.list.admin.dto";



@Injectable()
export class ReportAdminService {

  constructor(
    private readonly repo:ReportAdminRepository
  ){}

  async createCategory(body:ReportCategoryCreateAdminDto){
    return await this.repo.createCategory(body)
  }

  async getAllReport(filter:PaginationFilters){
    const result=await this.repo.getAllReports(filter)
    result.data=plainToInstance(ReportListAdminDto,result.data,{excludeExtraneousValues:true})
    return result
  }
}