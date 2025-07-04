/**
 * 基础功能测试脚本
 * 在浏览器控制台中运行，验证核心功能
 */

// 测试项目存储功能
async function testProjectStorage() {
  console.log('🔄 测试项目存储功能...');
  
  try {
    // 导入项目存储
    const { projectStorage } = await import('./lib/storage/project-storage.js');
    
    // 创建测试项目
    const testProject = await projectStorage.createProject({
      title: '功能测试项目',
      description: '用于验证基础功能的测试项目',
      type: 'novel',
      status: 'in_progress',
      tags: ['测试'],
      settings: {
        writingStyle: '测试风格',
        customPrompts: {}
      }
    });
    
    console.log('✅ 项目创建成功:', testProject);
    
    // 获取项目列表
    const projects = projectStorage.getAllProjects();
    console.log('✅ 项目列表获取成功，共', projects.length, '个项目');
    
    // 清理测试项目
    projectStorage.deleteProject(testProject.id);
    console.log('✅ 测试项目清理完成');
    
    return { success: true, message: '项目存储功能正常' };
  } catch (error) {
    console.error('❌ 项目存储测试失败:', error);
    return { success: false, error: error.message };
  }
}

// 测试导入解析器
async function testImportParser() {
  console.log('🔄 测试导入解析器...');
  
  try {
    // 导入解析器
    const { MarkdownParser } = await import('./lib/import-parser.js');
    
    const testContent = `# 第一章：测试章节

这是一个测试章节的内容。

## 角色介绍
- 主角：张三
- 配角：李四

## 情节要点
- 开始冒险
- 遇到困难
- 解决问题`;

    // 测试标准模式
    const standardParser = new MarkdownParser(testContent, 'test.md', 'standard');
    const standardResult = await standardParser.parse('test-project-id');
    
    console.log('✅ 标准解析模式测试结果:', standardResult);
    
    return { success: true, message: '导入解析器功能正常' };
  } catch (error) {
    console.error('❌ 导入解析器测试失败:', error);
    return { success: false, error: error.message };
  }
}

// 测试上下文服务
async function testContextService() {
  console.log('🔄 测试上下文服务...');
  
  try {
    // 导入上下文服务
    const { contextService } = await import('./lib/services/context-service.js');
    
    // 创建测试项目
    const { projectStorage } = await import('./lib/storage/project-storage.js');
    const testProject = await projectStorage.createProject({
      title: '上下文测试项目',
      description: '测试上下文服务',
      type: 'novel',
      status: 'in_progress',
      tags: ['测试'],
      settings: {}
    });
    
    // 创建测试文档
    await projectStorage.createDocument({
      projectId: testProject.id,
      type: 'character',
      title: '测试角色',
      content: '这是一个测试角色的描述',
      summary: '测试角色摘要',
      tags: [],
      isTemplate: false,
      metadata: { version: 1, isLocked: false, customFields: {} }
    });
    
    // 获取项目上下文摘要
    const contextSummary = await contextService.getProjectContextSummary(testProject.id);
    console.log('✅ 项目上下文摘要:', contextSummary);
    
    // 清理测试数据
    projectStorage.deleteProject(testProject.id);
    
    return { success: true, message: '上下文服务功能正常' };
  } catch (error) {
    console.error('❌ 上下文服务测试失败:', error);
    return { success: false, error: error.message };
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始运行基础功能测试...');
  
  const results = [];
  
  // 测试项目存储
  const storageResult = await testProjectStorage();
  results.push({ test: '项目存储', ...storageResult });
  
  // 测试导入解析器
  const parserResult = await testImportParser();
  results.push({ test: '导入解析器', ...parserResult });
  
  // 测试上下文服务
  const contextResult = await testContextService();
  results.push({ test: '上下文服务', ...contextResult });
  
  // 输出测试结果
  console.log('\n📊 测试结果汇总:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.test}: ${result.message || result.error}`);
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n🎯 测试完成: ${successCount}/${totalCount} 项测试通过`);
  
  if (successCount === totalCount) {
    console.log('🎉 所有基础功能测试通过！');
  } else {
    console.log('⚠️ 部分功能需要检查');
  }
  
  return results;
}

// 导出测试函数
if (typeof window !== 'undefined') {
  window.testBasicFunctionality = runAllTests;
  window.testProjectStorage = testProjectStorage;
  window.testImportParser = testImportParser;
  window.testContextService = testContextService;
  
  console.log('📝 测试函数已加载到全局对象:');
  console.log('- window.testBasicFunctionality() - 运行所有测试');
  console.log('- window.testProjectStorage() - 测试项目存储');
  console.log('- window.testImportParser() - 测试导入解析器');
  console.log('- window.testContextService() - 测试上下文服务');
}

export { runAllTests, testProjectStorage, testImportParser, testContextService };
