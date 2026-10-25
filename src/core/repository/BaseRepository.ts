import { PaginatedResult } from "@/features/common/dtos/paginated-result.dto"
import { PaginationFilters } from "@/features/common/filters/pagination.filters"
import { ConfigService } from "@nestjs/config"
import { FindOptionsRelations, FindOptionsWhere, ILike, Not, Repository } from "typeorm"

interface optionsType{
    not?: string[] 
    ILike?: string[] 
}

export abstract class BaseRepository<T extends Object> {
    protected abstract readonly config: ConfigService
    protected abstract readonly repo: Repository<T>

    private whereoptions(where: Record<string, any>, options?: optionsType) {
        if (!options) return where
        const keyarr: string[] = []
        if (options.ILike) {
            for (let l of options.ILike) {
                if (!keyarr.includes(l)) {
                    where[l] = ILike(where[l])
                    keyarr.push(l)
                }
            }
        }
        if (options.not) {
            for (let l of options.not) {
                if (!keyarr.includes(l)) {
                    where[l] = Not(where[l])
                    keyarr.push(l)
                }
            }
        }


        return where
    }

    async paginate(data:any[],filters:PaginationFilters,where?:Record<string,any>){
        const take = filters.size ?? +(this.config.getOrThrow<number>("DEFAULT_SIZE"))
        const currentPage = filters.page ?? +(this.config.getOrThrow<number>("DEFAULT_PAGE"))
        const totalCount = await this.repo.count({ where: where })
        const totalPages = Math.ceil(totalCount / take)

        const nextPage = currentPage < totalPages ? currentPage + 1 : null


        return { totalPages, totalCount, currentPage, nextPage, data } as PaginatedResult
    }

    async findOneBy(where: FindOptionsWhere<T>,options?: optionsType) {
        const find = this.whereoptions(where, options)
        return await this.repo.findOneBy(find as FindOptionsWhere<T>)
    }

    async findBy(where: FindOptionsWhere<T>,options?: optionsType) {
        const find = this.whereoptions(where, options)
        return await this.repo.findBy(find as FindOptionsWhere<T>)
    }

    async find(where?: FindOptionsWhere<T>,relations?:string[],options?:{skip:number,take:number},whereoptions?:optionsType,){
        let find :any
        if(where) find=this.whereoptions(where, whereoptions)
        return await this.repo.find({where:find,relations,skip:options?.skip,take:options?.take})
    }

    async countBy(where: Record<string, any>, options?: optionsType) {
        const find = this.whereoptions(where, options)
        return await this.repo.countBy(find)
    }
    async count(where?: Record<string, any>, options?: optionsType){
        const find = this.whereoptions(where??{}, options)
        return await this.repo.count({where:find})
    }

    async remove(scheme: T) {
        return await this.repo.remove(scheme)
    }

    async removesome(scheme: T[]) {
        return await this.repo.remove(scheme)
    }

    async save(scheme: T) {
        return await this.repo.save(scheme)
    }

    async getAll(filters: PaginationFilters, whereOptions?: FindOptionsWhere<T>,relations?:string[]) {
        const take = filters.size ?? +(this.config.getOrThrow<number>("DEFAULT_SIZE"))
        const currentPage = filters.page ?? +(this.config.getOrThrow<number>("DEFAULT_PAGE"))
        const skip = (currentPage - 1) * take
        const totalCount = await this.repo.count({ where: whereOptions })
        const totalPages = Math.ceil(totalCount / take)

        const nextPage = currentPage < totalPages ? currentPage + 1 : null


        const data = await this.repo.find({ take: take, skip, where: whereOptions ,relations:relations,order:{}})
        return { totalPages, totalCount, currentPage, nextPage, data } as PaginatedResult
    }
}