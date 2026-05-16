import { Roles } from "@/core/decorators/roles.decorator";
import { Role } from "@/core/enums/role.enum";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReportCategoryCreateAdminDto } from "../dtos/report-category/admin/report-category.create.admin.dto";
import { ReportAdminService } from "../services/report/report.admin.service";
import { PaginationFilters } from "@/features/common/filters/pagination.filters";
import { PaginatedResultDto } from "@/features/common/dtos/paginated-result.dto";
import { ReportListAdminDto } from "../dtos/report/admin/report.list.admin.dto";

@Controller("admin/report")
@Roles(Role.Admin,Role.SuperAdmin)
@ApiTags("Admin - Report")
@ApiCookieAuth()
export class ReportAdminController{
    constructor(private readonly serve:ReportAdminService){}

    @Post("category")
    async createCategory(@Body() payload:ReportCategoryCreateAdminDto){
        return await this.serve.createCategory(payload)
    }

    @Get()
    @ApiOkResponse({type:PaginatedResultDto(ReportListAdminDto)})
    async getAllReport(@Query() filter:PaginationFilters){
        return this.serve.getAllReport(filter)
    }
}