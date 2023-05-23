import { Project } from "@/@clean/shared/domain/entities/project"

test('Test Project entity', () => {
    const project = new Project({
        code: 'PI', 
        name: 'Portal Interno',
        description: 'Site controle de membros', 
    })
    expect(project).toBeInstanceOf(Project)
});

// Properties Tests

test('Test Project entity code', () => {
    const project = new Project({
        code: 'PI', 
        name: 'Portal Interno',
        description: 'Site controle de membros', 
    })
    expect(project.code).toBe('PI')
}) 

test('Test Project entity name', () => {
    const project = new Project({
        code: 'PI', 
        name: 'Portal Interno',
        description: 'Site controle de membros', 
    })
    expect(project.name).toBe('Portal Interno')
}) 

test('Test Project entity description', () => {
    const project = new Project({
        code: 'PI', 
        name: 'Portal Interno',
        description: 'Site controle de membros', 
    })
    expect(project.description).toBe('Site controle de membros')
}) 

