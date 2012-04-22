root = exports ? this

root.$

class JqueryExampleTest
  this.changeDescriptionExpectCorrectAltTag = ->
    id = 'test'
    description = 'Test Description'
    mock = MockRepository.generateMock().method('attr')
    mock.expect().method('attr').withArguments('alt', description).returns(mock).times(1)
    mock.expect().method('attr').withArguments('title', description).returns(mock).times(1)

    root.$ = ->
      return mock

    JqueryExample.changeDescription(id, description)

    mock.verifyExpectations()

Enhance.discoverTests(JqueryExampleTest).runTests();