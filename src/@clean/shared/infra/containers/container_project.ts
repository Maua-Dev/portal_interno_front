import 'reflect-metadata'
import { Container } from 'inversify'
import { http } from '../http'
import { ProjectRepositoryHttp } from '../repositories/project_repository_http'
import { GetAllProjectsUsecase } from '../../../modules/project/usecases/get_all_projects_usecase'

export const RegistryProject = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  ProjectRepositoryHttp: Symbol.for('ProjectRepositoryHttp'),
  ProjectRepositoryMock: Symbol.for('ProjectRepositoryMock'),

  // Usecases
  getAllProjectsUsecase: Symbol.for('GetAllProjectsUsecase')
}

export const containerProject = new Container()

// HTTP
containerProject.bind(RegistryProject.AxiosAdapter).toConstantValue(http)

// Repositories
containerProject
  .bind(RegistryProject.ProjectRepositoryHttp)
  .toDynamicValue((context) => {
    return new ProjectRepositoryHttp(
      context.container.get(RegistryProject.AxiosAdapter)
    )
  })

// Usecases
containerProject
  .bind(RegistryProject.getAllProjectsUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'test') {
      return new GetAllProjectsUsecase(
        context.container.get(RegistryProject.ProjectRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'dev' ||
      import.meta.env.VITE_STAGE === 'homolog' ||
      import.meta.env.VITE_STAGE === 'prod'
    ) {
      return new GetAllProjectsUsecase(
        context.container.get(RegistryProject.ProjectRepositoryHttp)
      )
    } else {
      return new GetAllProjectsUsecase(
        context.container.get(RegistryProject.ProjectRepositoryMock)
      )
    }
  })
