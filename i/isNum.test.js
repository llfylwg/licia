it('should return `true` for numbers', function ()
{
    expect(isNum(5)).to.be.true;
    expect(isNum(5.1)).to.be.true;
    expect(isNum({})).to.be.false;
});