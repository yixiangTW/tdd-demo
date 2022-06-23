const add = require('./calc')

const fetchUser = (id) => {
  return fetch(`http://localhost:4000/users/${id}`)
}

describe('calculator', () => {
  it('add two numbers', () => {
    expect(add(1, 2)).toEqual(3)
  })

  it('', () => {
    //expect({name: 1}).toBe({name: 1}) // fail
    expect({
      name: 1
    }).toEqual({
      name: 1
    })
    expect('1853-3345-3343').toMatch(/^\d{4}-\d{4}-\d{4}$/)

    expect([1, 2, 3]).toContainEqual(1)
  })

  it('obj', () => {
    const users = [{
        name: 'Juntao'
      },
      {
        name: 'Alex'
      },
      {
        name: undefined
      }
    ]

    expect(users).toContain(users[0])
    //expect(users).toContain({name: 'Juntao'}) fail
    expect(users).toContainEqual({
      name: 'Juntao'
    })

    expect(['1', 2, 3]).toContainEqual('1')
    expect(users[0].name).toBeDefined()
    expect(users[2].name).not.toBeDefined()
  })

  it('', () => {
    const givenName = expect.stringContaining('Juntao')
    expect('Juntao Qiu').toEqual(givenName)
  })


  it('fn', () => {
    const mock = jest.fn()
    mock('Juntao')
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith('Juntao')
    expect(mock).toHaveBeenCalledTimes(1)

    const fakeAdd = jest.fn().mockImplementation((a, b) => 5)
    expect(fakeAdd(1, 2)).toBe(5)

    const mockFun = jest.fn().mockImplementation(() => 'default').mockImplementationOnce(() => 'first call').mockImplementationOnce(() => 'second call')
    console.log(
      mockFun(),
      mockFun(),
      mockFun(),
    )
  })


  it('mock remote function', () => {

    const user = {
      name: 'Juntao'
    }

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        user
      })
    })
    fetchUser(111).then(x => console.log(x))
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/users/111')
  })


  it('', () => {
    const user = {
      name: 'Juntao Qiu',
      address: 'Xian',
      projects: [{
        name: 'ThoughtWorks University'
      }]
    }
    const matcher = expect.objectContaining({
      name: expect.stringContaining('Juntao'),
      projects: expect.arrayContaining([{
        name: expect.stringContaining('ThoughtWorks')
      }])
    });

    expect(user).toEqual(matcher)
  })
})