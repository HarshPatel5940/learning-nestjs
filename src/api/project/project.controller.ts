import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post, UsePipes
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthRole, Roles } from "../../shared/guards/auth.decorator";
import { projectAccessDto, projectAccessSchema, projectCreateDto, projectCreateSchema } from "../../shared/dto";
import { ZodValidationPipe } from "../../shared/pipes/zodPipe";

@Controller("project")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @AuthRole(Roles.Verified, Roles.Admin)
    @Get("/")
    GetAllProjects() {
        try {
            return this.projectService.GetAllProjects();
        } catch (error) {
            throw new HttpException(
                "Something Went Wrong",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @AuthRole(Roles.Verified, Roles.Admin)
    @Get("/:slug")
    GetProject(@Param("slug") dto: string) {
        try {
            return this.projectService.GetProject(dto);
        } catch (error) {
            throw new HttpException(
                "Something Went Wrong",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @AuthRole(Roles.Admin)
    @Post("/new")
    @UsePipes(new ZodValidationPipe(projectCreateSchema))
    CreateProject(@Body() dto: projectCreateDto) {
        try {
            return this.projectService.CreateProject(dto);
        } catch (error) {
            throw new HttpException(
                "Something Went Wrong",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @AuthRole(Roles.Admin)
    @Delete("/:slug")
    DeleteProject(@Param("slug") dto: string) {
        try {
            return this.projectService.DeleteProject(dto);
        } catch (error) {
            throw new HttpException(
                "Something Went Wrong",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    @AuthRole(Roles.Admin)
    @Patch("/:slug/access")
    @UsePipes(new ZodValidationPipe(projectAccessSchema))
    UpdateProjectAccess(
        @Body() dto: projectAccessDto,
        @Param("slug") slug: string,
    ) {
        try {
            return this.projectService.UpdateProjectAccess(dto, slug);
        } catch (error) {
            throw new HttpException(
                "Something Went Wrong",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
