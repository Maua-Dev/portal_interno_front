import { Project } from "@/@clean/shared/domain/entities/project"


test('Test Project entity', () => {
    const project = new Project({
        code: 'PI', 
        name: 'Portal Interno',
        description: 'Site controle de membros', 
    })
    expect(project).toBeInstanceOf(Project)
});